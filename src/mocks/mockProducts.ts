import { IProduct } from "../models/product";
import { ProductCategory } from "../models/productCategory";

export const MOCK_BOOK: IProduct = {
  category: ProductCategory.Book,
  price: 18,
  description: "Tales Of Mystery And Imagination",
  isImported: true,
};

export const MOCK_FOOD: IProduct = {
  category: ProductCategory.Food,
  description: "Pizza",
  isImported: true,
  price: 9,
};

export const MOCK_MEDICAL: IProduct = {
  category: ProductCategory.Medical,
  description: "Xanax",
  isImported: false,
  price: 31,
};

export const MOCK_OTHER: IProduct = {
  category: ProductCategory.Other,
  description: "Flabbergaster",
  isImported: false,
  price: 999999,
};
