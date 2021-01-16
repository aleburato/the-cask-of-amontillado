import {
  InvalidQuantityError,
  InvalidSalesTaxRateError,
} from "../utils/errors";
import {
  validatePositiveFinite,
  validatePositiveFiniteNonZero,
} from "../utils/validators";
import { IProduct } from "./product";

/**
 * A shopping basket item
 */
export interface IBasketItem {
  /**
   * The related product.
   */
  readonly product: IProduct;

  /**
   * The total sales tax rate applied to the item.
   */
  readonly salesTaxRate: number;

  /**
   * The number of products purchased.
   */
  readonly qty: number;
}

/**
 * The default implementation of a shopping basket item.
 */
export class BasketItem implements IBasketItem {
  /**
   * Creates a shopping basket item.
   * @param product the related product.
   * @param salesTaxRate the sales tax rate applied. Must be finite and >= 0.
   * @param qty the product quantity. Must be finite and > 0.
   */
  constructor(
    readonly product: IProduct,
    readonly salesTaxRate: number,
    readonly qty: number = 1
  ) {
    if (!validatePositiveFinite(salesTaxRate)) {
      throw new InvalidSalesTaxRateError();
    }

    if (!validatePositiveFiniteNonZero(qty)) {
      throw new InvalidQuantityError();
    }
  }
}
