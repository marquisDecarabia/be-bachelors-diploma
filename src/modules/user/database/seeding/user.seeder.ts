import { Factory, Seeder } from 'typeorm-seeding';
import { userSeeds } from '@modules/user/database/seeding/user.seeds';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await Promise.all(
      userSeeds.map((seed) => factory(UserOrmEntity)(seed).create()),
    );
  }
}
