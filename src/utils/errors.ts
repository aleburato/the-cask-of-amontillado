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

export class InvalidQuantityError extends CustomError {
  constructor() {
    super("Quantity must be finite and positive");
  }
}

export class InvalidSalesTaxRateError extends CustomError {
  constructor() {
    super("Sales tax rate must be finite and greater than or equal to zero");
  }
}

export class InvalidPriceError extends CustomError {
  constructor() {
    super("Price must be finite and greater than or equal to zero");
  }
}

export class InvalidTextError extends CustomError {
  constructor() {
    super("Text cannot be empty or whitespace");
  }
}
