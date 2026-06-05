import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import {
  BASE_THEME_STORAGE_KEY,
  defaultBaseTheme,
  defaultHighContrast,
  HIGH_CONTRAST_STORAGE_KEY,
  LEGACY_THEME_STORAGE_KEY,
} from "@/accessibility/theme";
import { mainContentId } from "@/accessibility/landmarks";
import { SiteHeader } from "@/features/foundation/components/site-header";
import {
  defaultLocale,
  languagePreferenceCookie,
  supportedLocales,
} from "@/i18n/locales";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: {
      default: t("siteTitle"),
      template: `%s | ${t("siteTitle")}`,
    },
    description: t("siteDescription"),
  };
}

const themeBootstrapScript = `
  (function () {
    try {
      var storedBaseTheme = window.localStorage.getItem("${BASE_THEME_STORAGE_KEY}");
      var storedHighContrast = window.localStorage.getItem("${HIGH_CONTRAST_STORAGE_KEY}");
      var legacyTheme = window.localStorage.getItem("${LEGACY_THEME_STORAGE_KEY}");
      var resolvedBaseTheme =
        storedBaseTheme === "dark" || storedBaseTheme === "light"
          ? storedBaseTheme
          : "${defaultBaseTheme}";
      var resolvedHighContrast =
        storedHighContrast === "true"
          ? true
          : storedHighContrast === "false"
            ? false
            : legacyTheme === "high-contrast"
              ? true
              : ${String(defaultHighContrast)};
      document.documentElement.dataset.theme = resolvedBaseTheme;
      document.documentElement.dataset.contrast = resolvedHighContrast ? "high" : "normal";
    } catch {
      document.documentElement.dataset.theme = "${defaultBaseTheme}";
      document.documentElement.dataset.contrast = "${defaultHighContrast ? "high" : "normal"}";
    }
  })();
`;

const languageBootstrapScript = `
  (function () {
    try {
      var supportedLocales = ${JSON.stringify(supportedLocales)};
      var cookie = document.cookie.split("; ").find(function (entry) {
        return entry.indexOf("${languagePreferenceCookie}=") === 0;
      });
      var storedLocale = cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
      var resolvedLocale = supportedLocales.indexOf(storedLocale) >= 0 ? storedLocale : "${defaultLocale}";
      document.documentElement.lang = resolvedLocale;
      document.documentElement.dataset.language = resolvedLocale;
    } catch {
      document.documentElement.lang = "${defaultLocale}";
      document.documentElement.dataset.language = "${defaultLocale}";
    }
  })();
`;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();
  const t = await getTranslations("layout");

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-theme="light"
      data-contrast="normal"
      data-language={locale}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootstrapScript }}
        />
        <Script
          id="language-bootstrap"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: languageBootstrapScript }}
        />
        <a className="skip-link" href={`#${mainContentId}`}>
          {t("skipLink")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteHeader />
          <main id={mainContentId} tabIndex={-1}>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
