export function roundToFactor(val: number, factor: number) {
  return Math.ceil(val / factor) * factor;
}
