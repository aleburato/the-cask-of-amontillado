import { InvalidPriceError, InvalidTextError } from "../utils/errors";
import {
  validateNotEmptyOrWhitespace,
  validatePositiveFinite,
} from "../utils/validators";
import { ProductCategory } from "./productCategory";

export interface IProduct {
  category: ProductCategory;
  price: number;
  description: string;
  isImported: boolean;
}

export class Product implements IProduct {
  constructor(
    readonly category: ProductCategory,
    readonly price: number,
    readonly description: string,
    readonly isImported: boolean = false
  ) {
    if (!validateNotEmptyOrWhitespace(description)) {
      throw new InvalidTextError();
    }
    if (!validatePositiveFinite(price)) {
      throw new InvalidPriceError();
    }
    if (!validateNotEmptyOrWhitespace(description)) {
      throw new InvalidTextError();
    }
  }
}
