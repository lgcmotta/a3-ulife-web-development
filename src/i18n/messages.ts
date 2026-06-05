import enMessages from "../../messages/en.json";
import ptBRMessages from "../../messages/pt-BR.json";
import { resolveLocale, type SupportedLocale } from "@/i18n/locales";

export const messageCatalogs = {
  en: enMessages,
  "pt-BR": ptBRMessages,
} satisfies Record<SupportedLocale, typeof enMessages>;

export type AppMessages = typeof enMessages;

export function getMessagesForLocale(locale: unknown): AppMessages {
  return messageCatalogs[resolveLocale(locale)];
}
