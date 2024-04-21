import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { OrderCreatedDomainEvent } from '@modules/order/domain/events/order-created.domain-event';
import { ProductRepositoryPort } from '@modules/product/database/product.repository.port';

export class ChangeStatusWhenOrderIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(OrderCreatedDomainEvent);
  }

  async handle(event: OrderCreatedDomainEvent): Promise<void> {
    const productRepo: ProductRepositoryPort =
      this.unitOfWork.getProductRepository(event.correlationId);
    const product = await productRepo.findOneByIdOrThrow(event.productId);
    product.sellProduct();
    await productRepo.save(product);
  }
}
