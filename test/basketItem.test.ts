import { BasketItem } from "../src/models/basketItem";
import {
  InvalidQuantityError,
  InvalidSalesTaxRateError,
} from "../src/utils/errors";

import { MOCK_BOOK, MOCK_FOOD } from "./mockData/mockProducts";

describe("BasketItem", () => {
  describe("Quantity", () => {
    it.each`
      qty
      ${0}
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have '$qty' qty", ({ qty }) => {
      expect(() => new BasketItem(MOCK_BOOK, 1, qty)).toThrowError(
        InvalidQuantityError
      );
    });
  });

  describe("Sales Tax Rate", () => {
    it.each`
      taxRate
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have '$taxRate' sales tax rate", ({ tax }) => {
      expect(() => new BasketItem(MOCK_FOOD, tax, 100)).toThrowError(
        InvalidSalesTaxRateError
      );
    });
  });
});
