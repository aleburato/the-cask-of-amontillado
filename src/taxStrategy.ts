import { IProduct } from "./models/product";
import { ProductCategory } from "./models/productCategory";

/**
 * A tax strategy. Decides how much to tax a product based on a custom logic.
 */
export interface ITaxStrategy {
  getTaxRateFor(product: IProduct): number;
}

/**
 * Implements the default strategy, which taxes a product depending on
 * its category and whether it's imported or not.
 */
class DefaultTaxStrategy implements ITaxStrategy {
  static readonly IMPORT_TAX_RATE: number = 5;
  static readonly DEFAULT_TAX_RATE: number = 10;
  static readonly TAX_RATES_BY_CATEGORY: Map<ProductCategory, number> = new Map(
    [
      [ProductCategory.Book, 0],
      [ProductCategory.Food, 0],
      [ProductCategory.Medical, 0],
    ]
  );

  getTaxRateFor(product: IProduct): number {
    const categorySpecificTaxes =
      DefaultTaxStrategy.TAX_RATES_BY_CATEGORY.get(product.category) ??
      DefaultTaxStrategy.DEFAULT_TAX_RATE;
    const additionalTaxes = product.isImported
      ? DefaultTaxStrategy.IMPORT_TAX_RATE
      : 0;
    return categorySpecificTaxes + additionalTaxes;
  }
}

export class TaxStrategyFactory {
  static readonly default = new DefaultTaxStrategy();
}
