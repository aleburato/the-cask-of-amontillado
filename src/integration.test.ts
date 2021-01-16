import { Invoice } from "./invoice";
import { InvoicePrinter, IInvoicePrinter } from "./invoicePrinter";
import { Product } from "./models/product";
import { ProductCategory } from "./models/productCategory";
import { IShoppingBasket, ShoppingBasket } from "./shoppingBasket";
import { TaxStrategyFactory } from "./taxStrategy";

describe("Integration Test", () => {
  let basket: IShoppingBasket;
  let printer: IInvoicePrinter;

  beforeEach(() => {
    basket = new ShoppingBasket(TaxStrategyFactory.default);
    printer = new InvoicePrinter();
  });

  it("Input 1", () => {
    [
      new Product(ProductCategory.Book, 12.49, "book"),
      new Product(ProductCategory.Other, 14.99, "music CD"),
      new Product(ProductCategory.Food, 0.85, "chocolate bar"),
    ].forEach((p) => basket.addProduct(p));

    const invoice = new Invoice(basket.getItems());

    const result = printer.print(invoice);
    expect(printer.print(invoice)).toBe(
      `1 book: 12.49
1 music CD: 16.49
1 chocolate bar: 0.85
Sales Taxes: 1.50
Total: 29.83`
    );
    console.log("OUTPUT 1\n\n" + result);
  });

  it("Input 2", () => {
    basket.addProduct(
      new Product(ProductCategory.Food, 10, "box of chocolates", true)
    );
    basket.addProduct(
      new Product(ProductCategory.Other, 47.5, "bottle of perfume", true)
    );

    const invoice = new Invoice(basket.getItems());

    const result = printer.print(invoice);
    expect(result).toBe(
      `1 imported box of chocolates: 10.50
1 imported bottle of perfume: 54.65
Sales Taxes: 7.65
Total: 65.15`
    );
    console.log("OUTPUT 2\n\n" + result);
  });

  it("Input 3", () => {
    basket.addProduct(
      new Product(ProductCategory.Other, 27.99, "bottle of perfume", true)
    );
    basket.addProduct(
      new Product(ProductCategory.Other, 18.99, "bottle of perfume", false)
    );
    basket.addProduct(
      new Product(ProductCategory.Medical, 9.75, "packet of headache pills")
    );
    basket.addProduct(
      new Product(ProductCategory.Food, 11.25, "box of chocolates", true)
    );

    const invoice = new Invoice(basket.getItems());

    const result = printer.print(invoice);
    expect(result).toBe(
      `1 imported bottle of perfume: 32.19
1 bottle of perfume: 20.89
1 packet of headache pills: 9.75
1 imported box of chocolates: 11.85
Sales Taxes: 6.70
Total: 74.68`
    );
    console.log("OUTPUT 3\n\n" + result);
  });
});
