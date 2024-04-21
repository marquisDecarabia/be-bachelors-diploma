import { ExceptionBase } from '@exceptions';

export class UserNotFoundError extends ExceptionBase {
  static readonly message = 'User not found by provided id';

  public readonly code = 'USER.NOT_FOUND';

  constructor(metadata?: unknown) {
    super(UserNotFoundError.message, metadata);
  }
}
