export function validateArrayNotEmpty(arr: readonly any[]) {
  return arr.length > 0;
}

export function validateNotEmptyOrWhitespace(str: string): boolean {
  return (str || "").trim().length > 0;
}

export function validatePositiveFinite(num: number): boolean {
  return doValidatePositiveFinite(num, false);
}

export function validatePositiveFiniteNonZero(num: number): boolean {
  return doValidatePositiveFinite(num, true);
}

function doValidatePositiveFinite(
  num: number,
  mustBeGreaterThanZero: boolean
): boolean {
  return (
    !isNaN(num) && isFinite(num) && (mustBeGreaterThanZero ? num > 0 : num >= 0)
  );
}
