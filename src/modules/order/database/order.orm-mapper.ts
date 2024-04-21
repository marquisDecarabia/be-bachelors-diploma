import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  OrderEntity,
  OrderProps,
} from '@modules/order/domain/entities/order.entity';
import { OrderOrmEntity } from '@modules/order/database/order.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class OrderOrmMapper extends OrmMapper<OrderEntity, OrderOrmEntity> {
  protected toOrmProps(entity: OrderEntity): OrmEntityProps<OrderOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<OrderOrmEntity> = {
      userId: props.userId.value,
      productId: props.productId.value,
      productInfo: props.productInfo,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: OrderOrmEntity): EntityProps<OrderProps> {
    const id = new UUID(ormEntity.id);
    const props: OrderProps = {
      userId: new UUID(ormEntity.userId),
      productId: new UUID(ormEntity.productId),
      productInfo: ormEntity.productInfo,
    };
    return { id, props };
  }
}
