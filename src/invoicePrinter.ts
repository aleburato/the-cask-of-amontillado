import { IInvoice } from "./invoice";
import {
  InvalidPriceError,
  InvalidSalesTaxError,
  InvoicePrinterEmptyError,
} from "./utils/errors";
import { IInvoiceEntry } from "./models/invoiceEntry";
import {
  validateArrayNotEmpty,
  validatePositiveFinite,
} from "./utils/validators";

/**
 * An invoice printer.
 */
export interface IInvoicePrinter {
  /**
   * Prints an invoice to a string.
   * @param invoice
   */
  print(invoice: IInvoice): string;
}

/**
 * The default implementation of an invoice printer.
 */
export class InvoicePrinter implements IInvoicePrinter {
  print(invoice: IInvoice): string {
    if (!validateArrayNotEmpty(invoice.items)) {
      throw new InvoicePrinterEmptyError();
    }

    if (!validatePositiveFinite(invoice.total)) {
      throw new InvalidPriceError();
    }

    if (!validatePositiveFinite(invoice.taxes)) {
      throw new InvalidSalesTaxError();
    }

    return [
      ...invoice.items.map(this.printItem),
      `Sales Taxes: ${invoice.taxes.toFixed(2)}`,
      `Total: ${invoice.total.toFixed(2)}`,
    ].join("\n");
  }

  private printItem = (item: IInvoiceEntry): string => {
    return `${item.qty} ${item.description}: ${item.grossPrice.toFixed(2)}`;
  };
}
