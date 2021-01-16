/**
 * Unit tests assertions based on throwing a custom error type
 * need this in order not to fail miserably.
 * Used to work around this limitation:
 * https://stackoverflow.com/questions/41102060/typescript-extending-error-class
 */
export class CustomError extends Error {
  constructor(msg?: string) {
    super(msg);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * An error thrown when trying to represent an invalid quantity.
 */
export class InvalidQuantityError extends CustomError {
  constructor() {
    super("Quantity must be finite and greater than zero");
  }
}

/**
 * An error thrown when trying to represent an invalid sales tax rate.
 */
export class InvalidSalesTaxRateError extends CustomError {
  constructor() {
    super("Sales tax rate must be finite and greater than or equal to zero");
  }
}

/**
 * An error thrown when trying to represent an invalid sales tax amount.
 */
export class InvalidSalesTaxError extends CustomError {
  constructor() {
    super("Sales tax must be finite and greater than or equal to zero");
  }
}

/**
 * An error thrown when trying to represent an invalid price.
 */
export class InvalidPriceError extends CustomError {
  constructor() {
    super("Price must be finite and greater than or equal to zero");
  }
}

/**
 * An error thrown when trying to represent an invalid description.
 */
export class InvalidDescriptionError extends CustomError {
  constructor() {
    super("Text cannot be empty or whitespace");
  }
}

/**
 * An error thrown when creating an empty invoice.
 */
export class EmptyInvoiceError extends CustomError {
  constructor() {
    super("Item list cannot be empty");
  }
}

/**
 * An error thrown when trying to print an empty invoice.
 */
export class InvoicePrinterEmptyError extends CustomError {
  constructor() {
    super("Cannot print an empty invoice");
  }
}
