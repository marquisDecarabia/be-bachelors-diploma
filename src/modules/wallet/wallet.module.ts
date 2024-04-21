import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { GetWalletByUserIdHttpController } from '@modules/wallet/queries/get-wallet-by-user-id/get-wallet-by-user-id.http.controller';
import { GetWalletByUserIdQueryHandler } from '@modules/wallet/queries/get-wallet-by-user-id/get-wallet-by-user-id.query-handler';
import { WalletRepository } from '@modules/wallet/database/wallet.repository';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import {
  createWalletWhenUserIsCreatedProvider,
  writeOffBalanceWhenOrderIsCreatedProvider,
} from '@modules/wallet/wallet.providers';
import { TopUpWalletBalanceHttpController } from '@modules/wallet/commands/top-up-wallet-balance/top-up-wallet-balance.http.controller';
import { TopUpWalletBalanceService } from '@modules/wallet/commands/top-up-wallet-balance/top-up-wallet-balance.service';

const httpControllers = [
  GetWalletByUserIdHttpController,
  TopUpWalletBalanceHttpController,
];

const repositories = [WalletRepository];

const queryHandlers = [GetWalletByUserIdQueryHandler];

const commandHandlers = [TopUpWalletBalanceService];

const eventProviders = [
  writeOffBalanceWhenOrderIsCreatedProvider,
  createWalletWhenUserIsCreatedProvider,
];

@Module({
  imports: [TypeOrmModule.forFeature([WalletOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...queryHandlers,
    ...commandHandlers,
    ...eventProviders,
  ],
})
export class WalletModule {}
