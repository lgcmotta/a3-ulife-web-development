import enMessages from "@/i18n/messages/en";
import type { SupportedLocale } from "@/i18n/locales";

declare module "next-intl" {
  interface AppConfig {
    Locale: SupportedLocale;
    Messages: typeof enMessages;
  }
}
