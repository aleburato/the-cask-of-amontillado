import { EmptyInvoiceError, Invoice } from "../src/invoice";
import { IBasketItem } from "../src/models/basketItem";
import { IInvoiceItem } from "../src/models/invoiceItem";

const MOCK_BASKET_ITEM_1 = {
  qty: 3,
  salesTaxRate: 10,
  product: {
    description: "Foo",
    price: 9,
  },
} as IBasketItem;

const MOCK_BASKET_ITEM_2 = {
  qty: 1,
  salesTaxRate: 0,
  product: {
    description: "Bar",
    price: 112.5,
  },
} as IBasketItem;

describe("Invoice", () => {
  it("Cannot create an empty invoice", () => {
    expect(() => new Invoice([])).toThrow(EmptyInvoiceError);
  });

  it("Creates a correct invoice with a single item", () => {
    const invoice = new Invoice([MOCK_BASKET_ITEM_1]);
    const expectedInvoiceItems: IInvoiceItem[] = [
      {
        name: "Foo",
        qty: 3,
        grossPrice: 29.7,
      },
    ];
    expect(invoice.items).toEqual(expectedInvoiceItems);
    expect(invoice.total).toEqual(29.7);
    expect(invoice.taxes).toEqual(2.7);
  });

  it("Creates a correct invoice with multiple items", () => {
    const invoice = new Invoice([MOCK_BASKET_ITEM_1, MOCK_BASKET_ITEM_2]);
    const expectedInvoiceItems: IInvoiceItem[] = [
      {
        name: "Foo",
        qty: 3,
        grossPrice: 29.7, // (3 * 9 * 10) / 100
      },
      {
        name: "Bar",
        qty: 1,
        grossPrice: 112.5,
      },
    ];
    expect(invoice.items).toEqual(expectedInvoiceItems);
    expect(invoice.total).toEqual(142.2);
    expect(invoice.taxes).toEqual(2.7);
  });
});
