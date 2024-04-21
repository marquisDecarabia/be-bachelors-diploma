import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Max, Min } from 'class-validator';
import { TopUpBalanceWallet } from '@src/interface-adapters/interfaces/wallet/top-up-balance.wallet.interface';

export class TopUpWalletBalanceRequest implements TopUpBalanceWallet {
  @ApiProperty({
    example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec231',
    description: 'Wallet id',
  })
  @IsUUID(4)
  readonly walletId: string;

  @ApiProperty({
    example: 115.0,
    description: 'Top up amount',
  })
  @Min(0.01)
  @Max(999999.99)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly amount: number;
}

export class TopUpWalletBalanceHttpRequest
  extends TopUpWalletBalanceRequest
  implements TopUpBalanceWallet {}
