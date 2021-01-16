import {
  InvalidTextError,
  InvalidPriceError,
  InvalidQuantityError,
} from "../utils/errors";
import {
  validateNotEmptyOrWhitespace,
  validatePositiveFinite,
  validatePositiveFiniteNonZero,
} from "../utils/validators";

export interface IInvoiceItem {
  readonly name: string;
  readonly qty: number;
  readonly grossPrice: number;
}

export class InvoiceItem implements IInvoiceItem {
  constructor(
    readonly name: string,
    readonly qty: number,
    readonly grossPrice: number
  ) {
    if (!validateNotEmptyOrWhitespace(name)) {
      throw new InvalidTextError();
    }

    if (!validatePositiveFiniteNonZero(qty)) {
      throw new InvalidQuantityError();
    }
    if (!validatePositiveFinite(grossPrice)) {
      throw new InvalidPriceError();
    }
  }
}
