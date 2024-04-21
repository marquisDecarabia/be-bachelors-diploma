import { Factory, Seeder } from 'typeorm-seeding';
import { walletSeeds } from '@modules/wallet/database/seeding/wallet.seeds';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';

export default class CreateWallets implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await Promise.all(
      walletSeeds.map((seed) => factory(WalletOrmEntity)(seed).create()),
    );
  }
}
