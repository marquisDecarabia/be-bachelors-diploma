import { ExceptionBase } from '@src/libs/exceptions';

export class ProductUnavailableError extends ExceptionBase {
  static readonly message = 'Product is unavailable';

  public readonly code = 'ORDER.PRODUCT_UNAVAILABLE';

  constructor(metadata?: unknown) {
    super(ProductUnavailableError.message, metadata);
  }
}

export class NotEnoughFundsError extends ExceptionBase {
  static readonly message = 'Not enough funds to buy product';

  public readonly code = 'ORDER.NOT_ENOUGH_FUNDS';

  constructor(metadata?: unknown) {
    super(NotEnoughFundsError.message, metadata);
  }
}
