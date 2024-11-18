export const isBrightColor = (color) => {
  // Remove '#' if present and validate hex color format
  const hex = color.startsWith("#") ? color.slice(1) : color;
  if (!/^([0-9A-Fa-f]{6})$/.test(hex)) {
    throw new Error("Invalid hex color string");
  }

  // Extract red, green, and blue components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate perceived brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // Return whether the color is bright
  return brightness > 128;
};
