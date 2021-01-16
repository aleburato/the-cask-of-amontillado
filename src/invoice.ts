import { validateArrayNotEmpty } from "./utils/validators";
import { IBasketItem } from "./models/basketItem";
import { CustomError } from "./utils/errors";
import { IInvoiceItem, InvoiceItem } from "./models/invoiceItem";
import { roundToFactor } from "./utils/rounding";

export interface IInvoice {
  readonly items: readonly IInvoiceItem[];
  readonly total: number;
  readonly taxes: number;
}

export class EmptyInvoiceError extends CustomError {
  constructor() {
    super("Item list cannot be empty");
  }
}

export class Invoice implements IInvoice {
  private static readonly RoundingFactor = 0.05;

  constructor(private readonly basketItems: readonly IBasketItem[]) {
    if (!validateArrayNotEmpty(this.basketItems)) {
      throw new EmptyInvoiceError();
    }
  }

  get items(): readonly IInvoiceItem[] {
    return this.basketItems.map(
      bi =>
        new InvoiceItem(this.getBiName(bi), bi.qty, this.getBiGrossPrice(bi))
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
    roundToFactor(
      this.getBiNetPrice(bi) * (bi.salesTaxRate / 100),
      Invoice.RoundingFactor
    );

  private getBiGrossPrice = (bi: IBasketItem): number =>
    this.getBiNetPrice(bi) + this.getBiTaxes(bi);
}
