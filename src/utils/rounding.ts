/**
 * Rounds the specified value up to the nearest multiple of the specified factor.
 * @param value the value to be rounded. Must be finite.
 * @param factor the rounding factor. Must be > 0 and <= 1.
 */
export function roundUpToFactor(value: number, factor: number) {
  if (!isFinite(value)) {
    throw new RangeError("value must be finite");
  }
  if (!isFinite(factor) || factor <= 0 || factor > 1) {
    throw new RangeError("factor must be > 0 and <= 1");
  }
  return Math.ceil(value / factor) * factor;
}
