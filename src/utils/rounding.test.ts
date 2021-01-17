import { roundUpToFactor } from "./rounding";

describe("Rounding", () => {
  it.each`
    number
    ${Number.NEGATIVE_INFINITY}
    ${Number.POSITIVE_INFINITY}
    ${NaN}
  `("invalid number parameter ($number) is not allowed", ({ number }) => {
    expect(() => roundUpToFactor(number, 0.05)).toThrowError(RangeError);
  });

  it.each`
    factor
    ${Number.NEGATIVE_INFINITY}
    ${Number.POSITIVE_INFINITY}
    ${NaN}
    ${0}
    ${-Number.EPSILON}
    ${1 + Number.EPSILON}
  `("invalid factor parameter ($factor) is not allowed", ({ factor }) => {
    expect(() => roundUpToFactor(1.76443, factor)).toThrowError(RangeError);
  });

  it.each`
    number  | factor  | expected
    ${0}    | ${1}    | ${0}
    ${1}    | ${1}    | ${1}
    ${1}    | ${0.5}  | ${1}
    ${1.34} | ${0.05} | ${1.35}
    ${1.31} | ${0.05} | ${1.35}
    ${1.3}  | ${0.05} | ${1.3}
  `(
    "rounding number $number with factor $factor yields $expected",
    ({ number, factor, expected }) => {
      expect(roundUpToFactor(number, factor)).toBeCloseTo(expected, 5);
    }
  );

  it("real world test (case 3)", () => {
    const TAXES =
      roundUpToFactor((27.99 * 15) / 100, 0.05) +
      roundUpToFactor((18.99 * 10) / 100, 0.05) +
      roundUpToFactor((11.25 * 5) / 100, 0.05);

    expect(TAXES).toBeCloseTo(6.7, 5);
  });
});
