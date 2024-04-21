import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { Wallet } from '@src/interface-adapters/interfaces/wallet/wallet.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { WalletEntity } from '@modules/wallet/domain/entities/wallet.entity';

export class WalletResponse extends ResponseBase implements Wallet {
  constructor(wallet: WalletEntity) {
    super(wallet);
    const props = wallet.getPropsCopy();
    this.userId = props.userId.value;
    this.balance = Number(props.balance);
    this.currency = props.currency;
  }

  @ApiProperty({
    example: '7e0154e2-aca2-4af6-92b4-bd5c517f5b36',
    description: 'User id (UUID v4)',
  })
  userId: string;

  @ApiProperty({
    example: 175.5,
    description: 'Wallet balance',
  })
  balance: number;

  @ApiProperty({
    example: Currencies.USD,
    enum: Currencies,
    description: 'Wallet currency',
  })
  currency: Currencies;
}

export class WalletHttpResponse extends WalletResponse implements Wallet {}
