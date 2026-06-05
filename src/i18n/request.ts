import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { getMessagesForLocale } from "@/i18n/messages";
import { languagePreferenceCookie, resolveLocale } from "@/i18n/locales";

export default getRequestConfig(async ({ locale }) => {
  const cookieStore = await cookies();
  const selectedLocale = resolveLocale(
    locale ?? cookieStore.get(languagePreferenceCookie)?.value,
  );

  return {
    locale: selectedLocale,
    messages: getMessagesForLocale(selectedLocale),
  };
});
