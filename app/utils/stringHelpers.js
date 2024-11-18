export const removeCharacterAtIndex = (str, index) => {
  // Validate input parameters
  if (typeof str !== "string") {
    throw new Error("The first argument must be a string");
  }
  if (typeof index !== "number" || index < 0 || index >= str.length) {
    throw new Error("Index is out of range");
  }

  // Return the string with the character removed
  return str.slice(0, index) + str.slice(index + 1);
};
