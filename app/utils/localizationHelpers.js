export const formatNumberByLocale = (num, locale = "en-US") => {
  // Validate that the input is a number
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Invalid number provided");
  }

  // Return the formatted number using the specified locale
  return new Intl.NumberFormat(locale).format(num);
};

export const convertToEnglishDigits = (numStr) => {
  // Ensure the input is a string
  if (typeof numStr !== "string") {
    throw new Error("Input must be a string");
  }

  // Replace Farsi and Arabic digits with their English equivalents
  return numStr
    .replace(/[\u0660-\u0669]/g, (c) => String(c.charCodeAt(0) - 0x0660))
    .replace(/[\u06f0-\u06f9]/g, (c) => String(c.charCodeAt(0) - 0x06f0));
};

export const convertToPersianDigits = (num) => {
  // Validate that the input is either a string or a number
  if (num == null || (typeof num !== "string" && typeof num !== "number")) {
    throw new Error("Input must be a number or a string");
  }

  // Persian digits corresponding to the English digits 0-9
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  // Convert all digits in the input string to Persian digits
  return num.toString().replace(/\d/g, (digit) => farsiDigits[digit]);
};
