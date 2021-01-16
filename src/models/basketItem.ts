import {
  InvalidQuantityError,
  InvalidSalesTaxRateError,
} from "../utils/errors";
import {
  validatePositiveFinite,
  validatePositiveFiniteNonZero,
} from "../utils/validators";
import { IProduct } from "./product";

export interface IBasketItem {
  readonly product: IProduct;
  readonly salesTaxRate: number;
  readonly qty: number;
}

export class BasketItem implements IBasketItem {
  constructor(
    readonly product: IProduct,
    readonly salesTaxRate: number,
    readonly qty: number = 1
  ) {
    if (!validatePositiveFiniteNonZero(qty)) {
      throw new InvalidQuantityError();
    }
    if (!validatePositiveFinite(salesTaxRate)) {
      throw new InvalidSalesTaxRateError();
    }
  }
}
