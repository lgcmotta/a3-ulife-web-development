import type { Metadata } from "next";
import {
  BASE_THEME_STORAGE_KEY,
  defaultBaseTheme,
  defaultHighContrast,
  HIGH_CONTRAST_STORAGE_KEY,
  LEGACY_THEME_STORAGE_KEY,
} from "@/accessibility/theme";
import { mainContentId } from "@/accessibility/landmarks";
import { SiteHeader } from "@/features/foundation/components/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Legado de Diogenes",
    template: "%s | Legado de Diogenes",
  },
  description:
    "A simple educational web platform with curated Computer Science learning tracks for beginner students.",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      data-theme="light"
      data-contrast="normal"
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        <a className="skip-link" href={`#${mainContentId}`}>
          Skip to main content
        </a>
        <SiteHeader />
        <main id={mainContentId} tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
