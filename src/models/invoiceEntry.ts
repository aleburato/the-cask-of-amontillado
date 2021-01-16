import {
  InvalidDescriptionError,
  InvalidPriceError,
  InvalidQuantityError,
} from "../utils/errors";
import {
  validateNotEmptyOrWhitespace,
  validatePositiveFinite,
  validatePositiveFiniteNonZero,
} from "../utils/validators";

/**
 * An invoice entry.
 */
export interface IInvoiceEntry {
  /**
   * The entry description.
   */
  readonly description: string;

  /**
   * The entry quantity.
   */
  readonly qty: number;

  /**
   * The entry gross price.
   */
  readonly grossPrice: number;
}

/**
 * The default implementation of an invoice entry.
 */
export class InvoiceEntry implements IInvoiceEntry {
  /**
   * Creates an invoice entry.
   * @param description the entry description. Must not be empty or whitespace.
   * @param qty the entry quantity. Must be finite and > 0.
   * @param grossPrice the entry gross price. Must be finite and >= 0.
   */
  constructor(
    readonly description: string,
    readonly qty: number,
    readonly grossPrice: number
  ) {
    if (!validateNotEmptyOrWhitespace(description)) {
      throw new InvalidDescriptionError();
    }

    if (!validatePositiveFiniteNonZero(qty)) {
      throw new InvalidQuantityError();
    }
    if (!validatePositiveFinite(grossPrice)) {
      throw new InvalidPriceError();
    }
  }
}
