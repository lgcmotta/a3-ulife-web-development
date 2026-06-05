import enMessages from "@/i18n/messages/en";
import ptBRMessages from "@/i18n/messages/pt-BR";
import { resolveLocale, type SupportedLocale } from "@/i18n/locales";

export const messageCatalogs = {
  en: enMessages,
  "pt-BR": ptBRMessages,
} satisfies Record<SupportedLocale, typeof enMessages>;

export type AppMessages = typeof enMessages;

export function getMessagesForLocale(locale: unknown): AppMessages {
  return messageCatalogs[resolveLocale(locale)];
}
