import { InvoiceItem } from "../src/models/invoiceItem";
import {
  InvalidPriceError,
  InvalidQuantityError,
  InvalidTextError,
} from "../src/utils/errors";

describe("InvoiceItem", () => {
  describe("Name", () => {
    it.each`
      name
      ${""}
      ${"    "}
      ${"\n"}
    `("cannot have '$name' name", ({ name }) => {
      expect(() => new InvoiceItem(name, 2, 100)).toThrowError(
        InvalidTextError
      );
    });
  });

  describe("Quantity", () => {
    it.each`
      qty
      ${0}
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have '$qty' qty", ({ qty }) => {
      expect(() => new InvoiceItem("meh", qty, 100)).toThrowError(
        InvalidQuantityError
      );
    });
  });

  describe("GrossPrice", () => {
    it.each`
      price
      ${-1}
      ${Number.NEGATIVE_INFINITY}
      ${Number.POSITIVE_INFINITY}
      ${NaN}
    `("cannot have '$price' gross price", ({ price }) => {
      expect(() => new InvoiceItem("meh", 1, price)).toThrowError(
        InvalidPriceError
      );
    });
  });
});
