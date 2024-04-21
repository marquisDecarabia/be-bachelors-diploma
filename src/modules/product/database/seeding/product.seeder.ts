import { Factory, Seeder } from 'typeorm-seeding';
import { productSeeds } from '@modules/product/database/seeding/product.seeds';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';

export default class CreateProducts implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await Promise.all(
      productSeeds.map((seed) => factory(ProductOrmEntity)(seed).create()),
    );
  }
}
