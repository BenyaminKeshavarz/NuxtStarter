import type { LocaleConfig } from "~/types/utils/i18n";

/**
 * Custom hook for number formatting across different locales
 * @returns Object containing number formatting functions
 */
export function useNumberFormatter() {
  const { handleError } = useErrorHandler();
  const { localeProperties } = useI18n();

  const locale = computed(() => localeProperties.value as LocaleConfig);

  /**
   * Formats a number according to the specified locale
   *
   * @param num - The number to format
   * @param options - The formatting options
   * @returns The formatted number as a string
   */
  function formatNumber(
    num: number,
    options: Intl.NumberFormatOptions = {},
  ): string {
    try {
      if (!num || isNaN(num)) {
        handleError("Invalid number provided");
        return "-";
      }

      const langCode = locale.value.language || locale.value.code;

      // Return the formatted number using the current locale
      return new Intl.NumberFormat(langCode, options).format(num);
    } catch (error) {
      console.error("Error formatting number:", error);
      return "-";
    }
  }

  /**
   * Converts Arabic and Persian digits in a string to their English equivalents
   * @param numStr - The string containing digits to convert
   * @returns A string with all Arabic/Persian digits converted to English
   */
  function convertToEnglishDigits(numStr: string): string {
    if (!numStr) {
      handleError("Input must be a string");
      return "-";
    }

    // Replace Farsi and Arabic digits with their English equivalents
    return numStr
      .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660))
      .replace(/[\u06f0-\u06f9]/g, (c) => String(c.charCodeAt(0) - 0x06f0));
  }

  /**
   * Converts English digits in a string or number to Persian digits
   * @param num - The string or number containing digits to convert
   * @returns A string with all English digits converted to Persian
   */
  function convertToPersianDigits(num: string | number): string {
    if (!num) {
      handleError("Input must be a number or a string");
      return "-";
    }

    const farsiDigits: string[] = [
      "۰",
      "۱",
      "۲",
      "۳",
      "۴",
      "۵",
      "۶",
      "۷",
      "۸",
      "۹",
    ];

    // Convert all digits in the input string to Persian digits
    return num.toString().replace(/\d/g, (digit) => {
      return farsiDigits[parseInt(digit, 10)] as string;
    });
  }

  /**
   * Formats a percentage value according to the current locale
   * @param value - The value to format as percentage
   * @param fractionDigits - Number of digits after the decimal point
   * @returns The formatted percentage as a string
   */
  function formatPercent(value: number, fractionDigits: number = 2): string {
    try {
      if ((!value && value !== 0) || isNaN(value)) {
        handleError("Invalid value provided");
        return "-";
      }

      const langCode = locale.value.language || locale.value.code;

      return new Intl.NumberFormat(langCode, {
        style: "percent",
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      }).format(value / 100);
    } catch (error) {
      console.error("Error formatting percentage:", error);
      return "-";
    }
  }

  return {
    formatNumber,
    convertToEnglishDigits,
    convertToPersianDigits,
    formatPercent,
  };
}
