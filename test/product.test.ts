import { Product } from "../src/models/product";
import { ProductCategory } from "../src/models/productCategory";
import { InvalidPriceError, InvalidTextError } from "../src/utils/errors";

describe("Product", () => {
  describe("Price", () => {
    it.each`
      price
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have '$price' price", ({ price }) => {
      expect(
        () => new Product(ProductCategory.Other, price, "something")
      ).toThrowError(InvalidPriceError);
    });
  });
  describe("Description", () => {
    it.each`
      desc
      ${""}
      ${"    "}
      ${"\n"}
    `("cannot have '$desc' description", ({ desc }) => {
      expect(() => new Product(ProductCategory.Other, 10, desc)).toThrowError(
        InvalidTextError
      );
    });
  });
});
