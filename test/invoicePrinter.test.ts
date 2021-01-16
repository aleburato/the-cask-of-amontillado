import {
  InvoicePrinter,
  InvoicePrinterEmptyError,
  InvoicePrinterInvalidTaxesError,
  InvoicePrinterInvalidTotalError,
} from "../src/invoicePrinter";

describe("Invoice Printer", () => {
  let printer: InvoicePrinter = new InvoicePrinter();

  it("Will not print an invoice with no items", () => {
    expect(() => printer.print({ items: [], taxes: 10, total: 100 })).toThrow(
      InvoicePrinterEmptyError
    );
  });

  it.each`
    total
    ${-10}
    ${Number.POSITIVE_INFINITY}
    ${Number.NEGATIVE_INFINITY}
    ${NaN}
  `("Will not print an invoice with invalid total ($total)", ({ total }) => {
    expect(() =>
      printer.print({
        total,
        items: [{ qty: 4, name: "meh", grossPrice: 10 }],
        taxes: 10,
      })
    ).toThrow(InvoicePrinterInvalidTotalError);
  });

  it.each`
    taxes
    ${-12}
    ${Number.POSITIVE_INFINITY}
    ${Number.NEGATIVE_INFINITY}
    ${NaN}
  `("Will not print an invoice with invalid taxes ($taxes)", ({ taxes }) => {
    expect(() =>
      printer.print({
        total: 112,
        items: [{ qty: 4, name: "meh", grossPrice: 10 }],
        taxes,
      })
    ).toThrow(InvoicePrinterInvalidTaxesError);
  });

  it("Correctly prints an invoice", () => {
    expect(
      printer.print({
        items: [
          { qty: 1, name: "Lava Lamp", grossPrice: 11.53 },
          { qty: 5, name: "Candy Bar", grossPrice: 56.65 },
        ],
        taxes: 7.65,
        total: 68.18,
      })
    ).toBe(
      `1 Lava Lamp: 11.53
5 Candy Bar: 56.65
Sales Taxes: 7.65
Total: 68.18`
    );
  });
});
