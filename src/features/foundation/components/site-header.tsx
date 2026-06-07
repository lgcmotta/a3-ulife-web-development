import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/features/foundation/components/language-toggle";
import { MobileSiteHeader } from "@/features/foundation/components/mobile-site-header";
import { PrimaryNavigation } from "@/features/foundation/components/primary-navigation";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";

export function SiteHeader() {
  const brand = useTranslations("brand");
  const navigation = useTranslations("navigation");
  const preferences = useTranslations("preferences");
  const themeToggleLabels = {
    visualTheme: preferences("visualTheme"),
    baseTheme: {
      light: preferences("baseTheme.light"),
      dark: preferences("baseTheme.dark"),
    },
    baseThemeToggle: preferences("baseTheme.toggle"),
    highContrast: preferences("highContrast.label"),
    highContrastToggle: preferences("highContrast.toggle"),
  };
  const languageToggleLabels = {
    groupLabel: preferences("language.label"),
    optionLabels: {
      en: preferences("language.english"),
      "pt-BR": preferences("language.portugueseBrazil"),
    },
    selectedLabels: {
      en: preferences("language.selected", {
        language: preferences("language.english"),
      }),
      "pt-BR": preferences("language.selected", {
        language: preferences("language.portugueseBrazil"),
      }),
    },
    switchLabels: {
      en: preferences("language.switchTo", {
        language: preferences("language.english"),
      }),
      "pt-BR": preferences("language.switchTo", {
        language: preferences("language.portugueseBrazil"),
      }),
    },
  };

  return (
    <header className="site-header">
      <div className="desktop-site-header">
        <Link className="brand-mark" href="/" aria-label={brand("homeLabel")}>
          <span aria-hidden="true">LD</span>
          <span>{brand("name")}</span>
        </Link>
        <PrimaryNavigation />
        <div className="preference-controls">
          <ThemeToggle labels={themeToggleLabels} />
          <LanguageToggle labels={languageToggleLabels} />
        </div>
      </div>
      <MobileSiteHeader
        brandHomeLabel={brand("homeLabel")}
        brandName={brand("name")}
        languageToggleLabels={languageToggleLabels}
        menuLabels={{
          openLabel: navigation("mobileMenu.openLabel"),
          closeLabel: navigation("mobileMenu.closeLabel"),
          regionLabel: navigation("mobileMenu.regionLabel"),
        }}
        themeToggleLabels={themeToggleLabels}
      />
    </header>
  );
}
