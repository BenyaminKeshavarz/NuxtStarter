import { useI18n } from "vue-i18n";
import {
  DateFormatter,
  type DateValue,
  parseAbsolute,
  getLocalTimeZone,
  parseDate,
  fromDate,
} from "@internationalized/date";

type DateTimeType = string | number | Date | undefined | null;

/**
 * Composable for formatting dates and times with reactivity to i18n locale changes.
 *
 * It is independent of any UI library and uses @internationalized/date directly.
 */
export function useDateTimeFormatter() {
  const { localeProperties } = useI18n();
  const langCode = computed(
    () => localeProperties.value.language || localeProperties.value.code,
  );

  // Parses various date formats into a standard DateValue object.
  function _parseDate(date: DateTimeType): DateValue | null {
    if (!date) return null;
    try {
      // Priority 1: Full ISO 8601 string with time
      if (typeof date === "string" && date.includes("T")) {
        return parseAbsolute(date, getLocalTimeZone());
      }

      // Priority 2: Date-only ISO 8601 string (YYYY-MM-DD)
      if (typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
        return parseDate(date);
      }

      // Fallback for JS Date objects, timestamps, or other string formats
      const jsDate = new Date(date);

      if (isNaN(jsDate.getTime())) {
        throw new Error("Invalid Date object created");
      }
      return fromDate(jsDate, getLocalTimeZone());
    } catch (e) {
      console.error("Invalid date passed to useFormattedDate:", date, e);
      return null;
    }
  }

  /**
   * Formats only the date part.
   * @param date - The date to format.
   * @param options - Intl.DateTimeFormat options.
   * @returns Formatted date string, '---' for invalid dates, or null for empty inputs.
   */
  function formatDate(
    date: DateTimeType,
    options: Intl.DateTimeFormatOptions = {},
  ): string {
    if (!date) return "";

    const parsedDate = _parseDate(date);
    if (!parsedDate) return "---";

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    };

    const formatter = new DateFormatter(langCode.value, {
      ...defaultOptions,
      ...options,
    });
    return formatter.format(parsedDate.toDate(getLocalTimeZone()));
  }

  /**
   * Formats only the time part.
   * @param date - The date to format.
   * @param options - Intl.DateTimeFormat options.
   * @returns Formatted time string, '---' for invalid dates, or null for empty inputs.
   */
  function formatTime(
    date: DateTimeType,
    options: Intl.DateTimeFormatOptions = {},
  ): string {
    if (!date) return "";

    const parsedDate = _parseDate(date);
    if (!parsedDate) return "---";

    const defaultOptions: Intl.DateTimeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
    };

    const formatter = new DateFormatter(langCode.value, {
      ...defaultOptions,
      ...options,
    });
    return formatter.format(parsedDate.toDate(getLocalTimeZone()));
  }

  /**
   * Formats both date and time.
   * @param date - The date to format.
   * @param options - Intl.DateTimeFormat options.
   * @returns Formatted date-time string, '---' for invalid dates, or null for empty inputs.
   */
  function formatDateTime(
    date: DateTimeType,
    options: Intl.DateTimeFormatOptions = {},
  ): string {
    if (!date) return "";

    const parsedDate = _parseDate(date);
    if (!parsedDate) return "---";

    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };

    const formatter = new DateFormatter(langCode.value, {
      ...defaultOptions,
      ...options,
    });
    return formatter.format(parsedDate.toDate(getLocalTimeZone()));
  }

  /**
   * Displays a relative time (e.g., "Today", "Yesterday") if the date is recent,
   * otherwise falls back to an absolute date format.
   * @param date - The date to format.
   * @param thresholdInDays - How many days to consider "recent".
   * @param absoluteFormatOptions - Format options if the date is not recent.
   * @returns Formatted string ('Today', 'Yesterday', or absolute date), or null.
   */
  function formatDateSmartRelative(
    date: DateTimeType,
    thresholdInDays = 7,
    absoluteFormatOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  ): string {
    if (!date) return "";

    const parsedDate = _parseDate(date);
    if (!parsedDate) return "---";

    // Convert to standard JS Date
    const targetJsDate = parsedDate.toDate(getLocalTimeZone());
    const todayJsDate = new Date();

    // Use UTC to avoid Daylight Saving Time (DST) issues when calculating difference
    const targetUTC = Date.UTC(
      targetJsDate.getFullYear(),
      targetJsDate.getMonth(),
      targetJsDate.getDate(),
    );
    const todayUTC = Date.UTC(
      todayJsDate.getFullYear(),
      todayJsDate.getMonth(),
      todayJsDate.getDate(),
    );

    const msPerDay = 1000 * 60 * 60 * 24;
    const daysDiff = Math.floor((todayUTC - targetUTC) / msPerDay);

    if (daysDiff === 0) return "امروز";
    if (daysDiff === 1) return "دیروز";

    if (daysDiff > 1 && daysDiff < thresholdInDays) {
      return `${daysDiff} روز پیش`;
    }

    return formatDate(date, absoluteFormatOptions);
  }

  return {
    formatDate,
    formatTime,
    formatDateTime,
    formatDateSmartRelative,
  };
}
