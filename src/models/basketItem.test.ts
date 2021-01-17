import { BasketItem } from "./basketItem";
import {
  InvalidQuantityError,
  InvalidSalesTaxRateError,
} from "../utils/errors";

import { MOCK_BOOK, MOCK_FOOD } from "../mocks/mockProducts";

describe("BasketItem", () => {
  describe("Quantity", () => {
    it("uses '1' as default quantity", () => {
      expect(new BasketItem(MOCK_BOOK, 1).qty).toBe(1);
    });

    it.each`
      qty
      ${0}
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have invalid qty ($qty)", ({ qty }) => {
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
    `("cannot have invalid sales tax rate ($taxRate)", ({ tax }) => {
      expect(() => new BasketItem(MOCK_FOOD, tax, 100)).toThrowError(
        InvalidSalesTaxRateError
      );
    });
  });
});
