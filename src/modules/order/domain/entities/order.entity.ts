import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { OrderCreatedDomainEvent } from '@modules/order/domain/events/order-created.domain-event';

export interface CreateOrderProps {
  userId: UUID;
  productId: UUID;
  productInfo: string;
  productPrice: number;
}

export type OrderProps = Omit<CreateOrderProps, 'productPrice'>;

export class OrderEntity extends AggregateRoot<OrderProps> {
  protected readonly _id: UUID;

  static create(create: CreateOrderProps): OrderEntity {
    const id = UUID.generate();
    const props: OrderProps = {
      ...create,
    };

    const order = new OrderEntity({ id, props });

    order.addEvent(
      new OrderCreatedDomainEvent({
        aggregateId: id.value,
        userId: props.userId.getRawProps(),
        productId: props.productId.getRawProps(),
        productPrice: create.productPrice,
      }),
    );

    return order;
  }
}
