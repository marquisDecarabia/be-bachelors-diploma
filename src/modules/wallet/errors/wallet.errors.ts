import { ExceptionBase } from '@exceptions';

export class WalletNotFoundError extends ExceptionBase {
  static readonly message = 'Wallet not found by provided id';

  public readonly code = 'WALLET.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(WalletNotFoundError.message, metadata);
  }
}

export class WalletNotFoundByUserIdError extends ExceptionBase {
  static readonly message = 'Wallet not found by provided user id';

  public readonly code = 'WALLET.NOT_FOUND_BY_USER_ID';

  constructor(metadata?: unknown) {
    super(WalletNotFoundByUserIdError.message, metadata);
  }
}

export class WalletBalanceOverextended extends ExceptionBase {
  static readonly message = 'Wallet balance cannot be greater than 1.000.000';

  public readonly code = 'WALLET.BALANCE_OVEREXTENDED';

  constructor(metadata?: unknown) {
    super(WalletBalanceOverextended.message, metadata);
  }
}
