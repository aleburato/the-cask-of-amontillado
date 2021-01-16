import { IProduct } from "../models/product";
import { ITaxStrategy } from "../taxStrategy";

export const MOCK_FIXED_TAX_RATE: number = 25;

export const MOCK_FIXED_TAXING_STRATEGY: ITaxStrategy = {
  getTaxRateFor: (_product: IProduct) => MOCK_FIXED_TAX_RATE,
};
