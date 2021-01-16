import { InvoiceEntry } from "./invoiceEntry";
import {
  InvalidPriceError,
  InvalidQuantityError,
  InvalidDescriptionError,
} from "../utils/errors";

describe("InvoiceEntry", () => {
  describe("Description", () => {
    it.each`
      description
      ${""}
      ${"    "}
      ${"\n"}
    `("cannot have invalid description ($description)", ({ description }) => {
      expect(() => new InvoiceEntry(description, 2, 100)).toThrowError(
        InvalidDescriptionError
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
    `("cannot have invalid qty ($qty)", ({ qty }) => {
      expect(() => new InvoiceEntry("meh", qty, 100)).toThrowError(
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
    `("cannot have invalid gross price ($price)", ({ price }) => {
      expect(() => new InvoiceEntry("meh", 1, price)).toThrowError(
        InvalidPriceError
      );
    });
  });
});
