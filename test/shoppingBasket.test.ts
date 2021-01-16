import { IShoppingBasket, ShoppingBasket } from "../src/shoppingBasket";

import {
  MOCK_FIXED_TAXING_STRATEGY,
  MOCK_FIXED_TAX_RATE,
} from "./mockData/mockTaxStrategy";
import {
  MOCK_BOOK,
  MOCK_FOOD,
  MOCK_MEDICAL,
  MOCK_OTHER,
} from "./mockData/mockProducts";
import { IBasketItem } from "../src/models/basketItem";

describe("ShoppingBasket", () => {
  let basket: IShoppingBasket;

  beforeEach(() => {
    basket = new ShoppingBasket(MOCK_FIXED_TAXING_STRATEGY);
  });

  it("returns an empty list of basketItems when it's empty", () => {
    expect(basket.getItems().length).toBe(0);
  });

  it("returns a correct list of items with one product added, default qty (1)", () => {
    basket.addProduct(MOCK_FOOD);
    const items = basket.getItems();
    expect(items).toEqual<IBasketItem[]>([
      {
        product: MOCK_FOOD,
        qty: 1,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
    ]);
  });

  it("returns a correct list of items with one product added, 'n' qty", () => {
    basket.addProduct(MOCK_BOOK, 5);
    const items = basket.getItems();
    expect(items).toEqual<IBasketItem[]>([
      {
        product: MOCK_BOOK,
        qty: 5,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
    ]);
  });

  it("returns a correct list of items with more than one product added", () => {
    basket.addProduct(MOCK_BOOK, 5);
    basket.addProduct(MOCK_MEDICAL, 2);
    basket.addProduct(MOCK_FOOD, 3);
    basket.addProduct(MOCK_OTHER, 4);
    const items = basket.getItems();
    expect(items).toEqual<IBasketItem[]>([
      {
        product: MOCK_BOOK,
        qty: 5,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
      {
        product: MOCK_MEDICAL,
        qty: 2,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
      {
        product: MOCK_FOOD,
        qty: 3,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
      {
        product: MOCK_OTHER,
        qty: 4,
        salesTaxRate: MOCK_FIXED_TAX_RATE,
      },
    ]);
  });
});
