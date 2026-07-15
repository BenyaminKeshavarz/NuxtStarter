import { en, fa_ir } from "@nuxt/ui/locale";

/** i18n code → Nuxt UI locale (`fa` has no UI export; only `fa_ir`). */
const uiLocaleMap = {
  fa: fa_ir,
  en,
} as const;

/**
 * Nuxt UI locale bridge for `<UApp>` + `html` lang/dir.
 * API / i18n lang stays `useI18n().locale` (`fa`).
 */
export function useUiLocale() {
  const { locale } = useI18n();

  const uiLocale = computed(
    () => uiLocaleMap[locale.value as keyof typeof uiLocaleMap] ?? fa_ir,
  );
  const lang = computed(() => uiLocale.value.code);
  const dir = computed(() => uiLocale.value.dir);

  return { uiLocale, lang, dir };
}
