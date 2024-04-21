import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

export class OrderCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<OrderCreatedDomainEvent>) {
    super(props);
    this.userId = props.userId;
    this.productId = props.productId;
    this.productPrice = props.productPrice;
  }

  readonly userId: string;

  readonly productId: string;

  readonly productPrice: number;
}
