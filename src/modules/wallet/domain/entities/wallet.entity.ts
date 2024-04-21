import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {
  ArgumentInvalidException,
  ArgumentOutOfRangeException,
} from '@exceptions';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';

export interface CreateWalletProps {
  userId: UUID;
  currency: Currencies;
}

export interface WalletProps extends CreateWalletProps {
  balance: number;
}

export class WalletEntity extends AggregateRoot<WalletProps> {
  protected readonly _id: UUID;

  static create(create: CreateWalletProps): WalletEntity {
    const id = UUID.generate();
    const props: WalletProps = { ...create, balance: 0.0 };

    return new WalletEntity({ id, props });
  }

  get balance(): number {
    return this.props.balance;
  }

  topUp(amount: number): void {
    if (amount < 0.01)
      throw new ArgumentOutOfRangeException(
        'Wallet balance can be replenished only for an amount equal to or greater than 0.01',
      );
    this.props.balance += amount;
  }

  spend(amount: number): void {
    if (amount > this.props.balance)
      throw new ArgumentOutOfRangeException(
        'The wallet balance is not enough for these expenses',
      );
    this.props.balance -= amount;
  }

  static validate(props: WalletProps): void {
    if (props.balance < 0.0) {
      throw new ArgumentOutOfRangeException(
        'Wallet balance cannot be less than 0',
      );
    }
    if (!(props.currency in Currencies)) {
      throw new ArgumentInvalidException('Incorrect status provided');
    }
  }
}
