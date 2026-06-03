import type { Metadata } from "next";
import { defaultTheme, THEME_STORAGE_KEY } from "@/accessibility/theme";
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
      var storedTheme = window.localStorage.getItem("${THEME_STORAGE_KEY}");
      var resolvedTheme =
        storedTheme === "high-contrast" ? "high-contrast" : "${defaultTheme}";
      document.documentElement.dataset.theme = resolvedTheme;
    } catch {
      document.documentElement.dataset.theme = "${defaultTheme}";
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
      data-theme="default"
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
