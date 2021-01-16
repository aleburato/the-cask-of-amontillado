import { IInvoice } from "./invoice";
import { CustomError } from "./utils/errors";
import { IInvoiceItem } from "./models/invoiceItem";
import {
  validateArrayNotEmpty,
  validatePositiveFinite,
} from "./utils/validators";

export class InvoicePrinterEmptyError extends CustomError {
  constructor() {
    super("Cannot print an empty invoice");
  }
}

export class InvoicePrinterInvalidTotalError extends CustomError {
  constructor() {
    super(
      "Invoice total cost must be finite and greater than or equal to zero"
    );
  }
}

export class InvoicePrinterInvalidTaxesError extends CustomError {
  constructor() {
    super("Invoice taxes must be finite and greater than or equal to zero");
  }
}

export class InvoicePrinter {
  print(invoice: IInvoice): string {
    if (!validateArrayNotEmpty(invoice.items)) {
      throw new InvoicePrinterEmptyError();
    }

    if (!validatePositiveFinite(invoice.total)) {
      throw new InvoicePrinterInvalidTotalError();
    }

    if (!validatePositiveFinite(invoice.taxes)) {
      throw new InvoicePrinterInvalidTaxesError();
    }

    return [
      ...invoice.items.map(this.printItem),
      `Sales Taxes: ${invoice.taxes.toFixed(2)}`,
      `Total: ${invoice.total.toFixed(2)}`,
    ].join("\n");
  }

  private printItem = (item: IInvoiceItem): string => {
    return `${item.qty} ${item.name}: ${item.grossPrice.toFixed(2)}`;
  };
}
