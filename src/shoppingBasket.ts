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

  getItems(): readonly IBasketItem[];
}

export class ShoppingBasket implements IShoppingBasket {
  private readonly _items: IBasketItem[] = [];

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
