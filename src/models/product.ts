import { InvalidPriceError, InvalidDescriptionError } from "../utils/errors";
import {
  validateNotEmptyOrWhitespace,
  validatePositiveFinite,
} from "../utils/validators";
import { ProductCategory } from "./productCategory";

/**
 * A product.
 */
export interface IProduct {
  /**
   * The product category.
   */
  category: ProductCategory;
  /**
   * The product price.
   */
  price: number;
  /**
   * The product description.
   */
  description: string;
  /**
   * A flag indicating whether the product is imported.
   */
  isImported: boolean;
}

/**
 * The default implementation of a product.
 */
export class Product implements IProduct {
  /**
   *
   * @param category the product category.
   * @param price the product price. Must be finite and >= 0.
   * @param description the product description. Must not be empty or whitespace.
   * @param isImported a flag indicating whether the product is imported. False by default.
   */
  constructor(
    readonly category: ProductCategory,
    readonly price: number,
    readonly description: string,
    readonly isImported: boolean = false
  ) {
    if (!validateNotEmptyOrWhitespace(description)) {
      throw new InvalidDescriptionError();
    }
    if (!validatePositiveFinite(price)) {
      throw new InvalidPriceError();
    }
    if (!validateNotEmptyOrWhitespace(description)) {
      throw new InvalidDescriptionError();
    }
  }
}
