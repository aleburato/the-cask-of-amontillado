import { BasketItem, IBasketItem } from "./models/basketItem";
import { IProduct } from "./models/product";
import { ITaxStrategy } from "./taxStrategy";

export interface IShoppingBasket {
  /**
   * Adds one or more products to the basket.
   * @param product the product to be added.
   * @param qty the quantity of products to be added, defaults to 1 if not specified.
   */
  addProduct(product: IProduct, qty?: number): void;

  /**
   * Gets the items currently in the basket.
   */
  getItems(): readonly IBasketItem[];
}

/**
 * The default implementation of a shopping basket.
 */
export class ShoppingBasket implements IShoppingBasket {
  private readonly _items: IBasketItem[] = [];

  /**
   * Creates an instance of a shopping basket using the specified tax strategy.
   * @param strategy the sales tax strategy that will be used to
   * tax all products added to the basket.
   */
  constructor(private readonly strategy: ITaxStrategy) {}

  addProduct = (product: IProduct, qty: number = 1): void => {
    this._items.push(
      new BasketItem(product, this.strategy.getTaxRateFor(product), qty)
    );
  };

  getItems = (): readonly IBasketItem[] => {
    return [...this._items];
  };
}
