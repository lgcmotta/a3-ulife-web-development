import type { Metadata } from "next";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import {
  resolveVisualPreferenceFromCombination,
  themePreferenceCookie,
} from "@/accessibility/theme";
import { mainContentId } from "@/accessibility/landmarks";
import { PreferenceProviders } from "@/features/foundation/components/preference-providers";
import { SiteHeader } from "@/features/foundation/components/site-header";
import { resolveLocale } from "@/i18n/locales";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = resolveLocale(await getLocale());
  const messages = await getMessages();
  const t = await getTranslations("layout");
  const cookieStore = await cookies();
  const themePreference = resolveVisualPreferenceFromCombination(
    cookieStore.get(themePreferenceCookie)?.value,
  );

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      data-theme={themePreference.baseTheme}
      data-contrast={themePreference.contrast}
      data-language={locale}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <a className="skip-link" href={`#${mainContentId}`}>
          {t("skipLink")}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <PreferenceProviders
            initialLocale={locale}
            initialThemePreference={themePreference}
          >
            <SiteHeader />
            <main id={mainContentId} tabIndex={-1}>
              {children}
            </main>
          </PreferenceProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
