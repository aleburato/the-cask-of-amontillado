import { IProduct } from "../src/models/product";
import { ITaxStrategy, TaxStrategyFactory } from "../src/taxStrategy";
import {
  MOCK_BOOK,
  MOCK_FOOD,
  MOCK_MEDICAL,
  MOCK_OTHER,
} from "./mockData/mockProducts";

describe("Default Tax Strategy", () => {
  let strategy: ITaxStrategy = TaxStrategyFactory.default;

  it.each`
    product         | isImported | taxRate
    ${MOCK_BOOK}    | ${false}   | ${0}
    ${MOCK_FOOD}    | ${false}   | ${0}
    ${MOCK_MEDICAL} | ${false}   | ${0}
    ${MOCK_OTHER}   | ${false}   | ${10}
    ${MOCK_BOOK}    | ${true}    | ${5}
    ${MOCK_FOOD}    | ${true}    | ${5}
    ${MOCK_MEDICAL} | ${true}    | ${5}
    ${MOCK_OTHER}   | ${true}    | ${15}
  `(
    "Returns $taxRate for $product.category product (imported: $isImported)",
    ({ product, isImported, taxRate }) => {
      const actualProduct: IProduct = { ...product, isImported };
      expect(strategy.getTaxRateFor(actualProduct)).toBe(taxRate);
    }
  );
});
