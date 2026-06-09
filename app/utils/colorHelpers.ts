const { handleError } = useErrorHandler();

/**
 * Validates if a string is a valid hex color
 * @param color - The color string to validate
 * @returns True if the color is a valid hex color
 */
export const isValidHexColor = (color: string): boolean => {
  const hex = color.startsWith("#") ? color.slice(1) : color;
  return /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
};

/**
 * Normalizes a hex color to 6 characters format
 * @param color - The hex color to normalize
 * @returns Normalized 6-character hex color without # prefix
 */
export const normalizeHexColor = (color: string): string => {
  // Remove '#' if present
  const hex = color.startsWith("#") ? color.slice(1) : color;

  // Convert 3-character hex to 6-character format
  if (hex.length === 3) {
    return hex
      .split("")
      .map((char) => char + char)
      .join("");
  }

  return hex;
};

/**
 * Determines if a color is bright (light) or dark
 * Uses the perceived brightness formula: (R*299 + G*587 + B*114) / 1000
 *
 * @param color - The hex color string (with or without # prefix)
 * @returns True if the color is bright, false if dark
 */
export const isBrightColor = (color: string): boolean => {
  if (!isValidHexColor(color)) {
    handleError("Invalid hex color string");
    return false;
  }

  const hex = normalizeHexColor(color);

  // Extract red, green, and blue components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return whether the color is bright
  return brightness > 128;
};

/**
 * Returns appropriate text color (black or white) for a given background color
 * @param backgroundColor - The hex color string of the background
 * @returns "#000000" for bright backgrounds, "#FFFFFF" for dark backgrounds
 */
export const getContrastTextColor = (backgroundColor: string): string => {
  return isBrightColor(backgroundColor) ? "#000000" : "#FFFFFF";
};
