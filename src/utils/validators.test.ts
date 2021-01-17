import {
  validateArrayNotEmpty,
  validateNotEmptyOrWhitespace,
  validatePositiveFinite,
  validatePositiveFiniteNonZero,
} from "./validators";

describe("Validators", () => {
  describe("validateArrayNotEmpty", () => {
    it("returns true whether an array is NOT empty, false otherwise", () => {
      expect(validateArrayNotEmpty([])).toBeFalsy();
      expect(validateArrayNotEmpty(["meh"])).toBeTruthy();
    });
  });

  describe("validateNotEmptyOrWhitespace", () => {
    it("Returns true whether a string is NOT empty or whitespace, false otherwise", () => {
      expect(validateNotEmptyOrWhitespace("")).toBeFalsy();
      expect(validateNotEmptyOrWhitespace("    ")).toBeFalsy();
      expect(validateNotEmptyOrWhitespace("\n\n\n")).toBeFalsy();
      expect(validateNotEmptyOrWhitespace(".")).toBeTruthy();
    });
  });

  describe("validatePositiveFinite", () => {
    it("Returns true whether a number is >= 0 and finite, false otherwise", () => {
      commonExpectPositiveFinite(validatePositiveFinite);
      expect(validatePositiveFinite(0)).toBeTruthy();
    });
  });

  describe("validatePositiveFiniteNonZero", () => {
    it("Returns true whether a number is > 0 and finite, false otherwise", () => {
      commonExpectPositiveFinite(validatePositiveFiniteNonZero);
      expect(validatePositiveFiniteNonZero(0)).toBeFalsy();
    });
  });
});

function commonExpectPositiveFinite(validator: (num: number) => boolean): void {
  expect(validator(-Number.EPSILON)).toBeFalsy();
  expect(validator(Number.NEGATIVE_INFINITY)).toBeFalsy();
  expect(validator(Number.POSITIVE_INFINITY)).toBeFalsy();
  expect(validator(NaN)).toBeFalsy();
  expect(validator(12345)).toBeTruthy();
  expect(validator(Number.MAX_VALUE)).toBeTruthy();
}
