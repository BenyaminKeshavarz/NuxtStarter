const { handleError } = useErrorHandler();

/**
 * Removes a character at a specified index from a string
 * @param str - The input string
 * @param index - The index of the character to remove
 * @returns The string with the character removed
 */
export const removeCharacterAtIndex = (str: string, index: number): string => {
  // Validate input parameters
  if (!str) {
    handleError("The first argument must be a string");
    return "-";
  }
  if (!index || index < 0 || index >= str.length) {
    handleError("Index is out of range");
    return "-";
  }

  // Return the string with the character removed
  return str.slice(0, index) + str.slice(index + 1);
};
