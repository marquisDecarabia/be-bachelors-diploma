import { define } from 'typeorm-seeding';
import { NonFunctionProperties } from '@libs/types';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';

define(
  ProductOrmEntity,
  (_, product: NonFunctionProperties<ProductOrmEntity>) => {
    return new ProductOrmEntity(product);
  },
);
