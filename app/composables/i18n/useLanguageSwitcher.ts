import type { LocaleObject } from "@nuxtjs/i18n";

type SupportedLocaleCode = LocaleObject["code"];

interface LocaleCurrency {
  code: string;
  symbol: string;
  position: "before" | "after";
}

interface LocaleConfig extends LocaleObject {
  currency: LocaleCurrency;
  language: string;
}

/**
 * Composable for handling language switching functionality
 */
export const useLanguageSwitcher = () => {
  const { locale, locales } = useI18n();
  const switchLocalePath = useSwitchLocalePath(); // Helper to get the correct URL

  const selectedLocale = computed<LocaleConfig>(() => {
    const found = locales.value.find((i) => i.code === locale.value);
    if (!found) throw new Error(`Locale ${locale.value} not found`);
    return found as LocaleConfig;
  });

  const availableLocales = computed(() =>
    locales.value.filter((i) => i.code !== locale.value),
  );

  async function switchLanguage(
    localeCode: SupportedLocaleCode,
  ): Promise<void> {
    if (locale.value === localeCode) return;

    const newPath = switchLocalePath(localeCode);

    if (newPath) {
      window.location.href = newPath;
    }
  }

  return {
    availableLocales,
    selectedLocale,
    switchLanguage,
  };
};
