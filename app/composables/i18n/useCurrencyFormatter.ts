type AmountType = number | string;

type LocaleWithCurrency = {
  code: string;
  language?: string;
  currency: {
    code: string;
    symbol: string;
    position: "before" | "after";
  };
};

/**
 * Composable for currency formatting across different locales
 */
export function useCurrencyFormatter() {
  const { localeProperties } = useI18n();
  const locale = computed(() => localeProperties.value as LocaleWithCurrency);
  const langCode = computed(() => locale.value.language || locale.value.code);

  /**
   * Validates if the provided amount is a valid number
   * @param amount - The amount to validate
   * @returns True if amount is valid, false otherwise
   */
  function isValidAmount(amount: AmountType): boolean {
    const numericAmount = Number(amount);
    return !isNaN(numericAmount) && isFinite(numericAmount);
  }

  /**
   * Formats a number as currency according to the current locale
   * @param amount - The amount to format
   * @returns Formatted currency string or fallback
   */
  function formatCurrency(amount: AmountType): string {
    try {
      if (!isValidAmount(amount)) {
        console.warn("Invalid amount provided to formatCurrency:", amount);
        return "---";
      }

      const formatter = new Intl.NumberFormat(langCode.value, {
        style: "currency",
        currency: locale.value.currency.code,
      });

      return formatter.format(Number(amount));
    } catch (error) {
      console.error("Error formatting currency:", error);
      return "---";
    }
  }

  /**
   * Formats a number as currency with custom formatting (no decimals)
   * Returns amount and symbol separately for flexible styling
   * @param amount - The amount to format
   * @returns Object with formatted amount and currency symbol
   */
  function formatCustomCurrency(amount: AmountType): {
    amount: string;
    symbol: string;
  } {
    try {
      if (!isValidAmount(amount)) {
        console.warn(
          "Invalid amount provided to formatCustomCurrency:",
          amount,
        );
        return { amount: "---", symbol: "" };
      }

      const { symbol } = locale.value.currency;

      const formatter = new Intl.NumberFormat(langCode.value, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      const formattedAmount = formatter.format(Number(amount));

      return {
        amount: formattedAmount,
        symbol,
      };
    } catch (error) {
      console.error("Error formatting custom currency:", error);
      return { amount: "---", symbol: "" };
    }
  }

  /**
   * Formats a number as currency string with symbol positioned correctly
   * @param amount - The amount to format
   * @returns Formatted currency string with symbol
   */
  function formatCurrencyString(amount: AmountType): string {
    const parts = formatCustomCurrency(amount);
    const { position } = locale.value.currency;
    return position === "before"
      ? `${parts.symbol}${parts.amount}`
      : `${parts.amount} ${parts.symbol}`;
  }

  return {
    formatCurrency,
    formatCustomCurrency,
    formatCurrencyString,
  };
}
