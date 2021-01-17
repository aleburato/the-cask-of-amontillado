/**
 * Returns true whether an array is NOT empty, false otherwise.
 * @param arr the array
 */
export function validateArrayNotEmpty(arr: readonly any[]) {
  return arr.length > 0;
}

/**
 * Returns true whether a string is NOT empty or whitespace, false otherwise.
 * @param str the string.
 */
export function validateNotEmptyOrWhitespace(str: string): boolean {
  return (str || "").trim().length > 0;
}

/**
 * Returns true whether a number is >= 0 and finite, false otherwise.
 * @param num the number.
 */
export function validatePositiveFinite(num: number): boolean {
  return isFinite(num) && num >= 0;
}

/**
 * Returns true whether a number is > 0 and finite, false otherwise.
 * @param num the number.
 */
export function validatePositiveFiniteNonZero(num: number): boolean {
  return isFinite(num) && num > 0;
}
