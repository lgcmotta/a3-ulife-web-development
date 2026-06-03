import type { Metadata } from "next";
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
