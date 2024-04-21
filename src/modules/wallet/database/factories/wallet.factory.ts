import { define } from 'typeorm-seeding';
import { NonFunctionProperties } from '@libs/types';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';

define(WalletOrmEntity, (_, wallet: NonFunctionProperties<WalletOrmEntity>) => {
  return new WalletOrmEntity(wallet);
});
