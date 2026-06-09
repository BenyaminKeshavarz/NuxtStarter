import type { LocaleObject } from "@nuxtjs/i18n";

export type SupportedLocaleCode = LocaleObject["code"];
export type Direction = "ltr" | "rtl";
export type DateTimeType = Date | string | number;
export type AmountType = number | string;
export type DateTimeFormatOptions = Intl.DateTimeFormatOptions;

export interface LocaleCurrency {
  code: string;
  symbol: string;
  position: "before" | "after";
}

export interface LocaleConfig extends LocaleObject {
  currency: LocaleCurrency;
  language: string;
}
