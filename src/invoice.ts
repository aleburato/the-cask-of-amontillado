import { validateArrayNotEmpty } from "./utils/validators";
import { IBasketItem } from "./models/basketItem";
import { IInvoiceEntry, InvoiceEntry } from "./models/invoiceEntry";
import { roundUpToFactor } from "./utils/rounding";
import { EmptyInvoiceError } from "./utils/errors";

/**
 * An invoice.
 */
export interface IInvoice {
  /**
   * The invoice items.
   */
  readonly items: readonly IInvoiceEntry[];

  /**
   * The invoice total cost, taxes included.
   */
  readonly total: number;

  /**
   * The taxes included in the above total.
   */
  readonly taxes: number;
}

/**
 * The default IInvoice implementation.
 */
export class Invoice implements IInvoice {
  private static readonly RoundingFactor = 0.05;

  /**
   * Creates an invoice.
   * @param basketItems the basket items from which the invoice is created. Cannot be empty.
   */
  constructor(private readonly basketItems: readonly IBasketItem[]) {
    if (!validateArrayNotEmpty(this.basketItems)) {
      throw new EmptyInvoiceError();
    }
  }

  get items(): readonly IInvoiceEntry[] {
    return this.basketItems.map(
      (bi) =>
        new InvoiceEntry(this.getBiName(bi), bi.qty, this.getBiGrossPrice(bi))
    );
  }

  get total(): number {
    return this.basketItems.reduce(
      (acc, bi) => acc + this.getBiGrossPrice(bi),
      0
    );
  }

  get taxes(): number {
    return this.basketItems.reduce((acc, bi) => acc + this.getBiTaxes(bi), 0);
  }

  private getBiName = (bi: IBasketItem): string =>
    `${bi.product.isImported ? "imported " : ""}${bi.product.description}`;

  private getBiNetPrice = (bi: IBasketItem): number =>
    bi.product.price * bi.qty;

  private getBiTaxes = (bi: IBasketItem): number =>
    roundUpToFactor(
      this.getBiNetPrice(bi) * (bi.salesTaxRate / 100),
      Invoice.RoundingFactor
    );

  private getBiGrossPrice = (bi: IBasketItem): number =>
    this.getBiNetPrice(bi) + this.getBiTaxes(bi);
}
