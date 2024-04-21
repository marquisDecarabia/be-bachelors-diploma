import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  ProductEntity,
  ProductProps,
} from '@modules/product/domain/entities/product.entity';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class ProductOrmMapper extends OrmMapper<
  ProductEntity,
  ProductOrmEntity
> {
  protected toOrmProps(
    entity: ProductEntity,
  ): OrmEntityProps<ProductOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<ProductOrmEntity> = {
      name: props.name,
      price: props.price,
      currency: props.currency,
      status: props.status,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: ProductOrmEntity,
  ): EntityProps<ProductProps> {
    const id = new UUID(ormEntity.id);
    const props: ProductProps = {
      name: ormEntity.name,
      price: ormEntity.price,
      currency: ormEntity.currency,
      status: ormEntity.status,
    };
    return { id, props };
  }
}
