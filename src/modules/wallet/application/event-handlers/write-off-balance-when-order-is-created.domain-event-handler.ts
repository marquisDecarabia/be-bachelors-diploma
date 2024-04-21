import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port';
import { OrderCreatedDomainEvent } from '@modules/order/domain/events/order-created.domain-event';

export class WriteOffBalanceWhenOrderIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(OrderCreatedDomainEvent);
  }

  async handle(event: OrderCreatedDomainEvent): Promise<void> {
    const walletRepo: WalletRepositoryPort =
      this.unitOfWork.getWalletRepository(event.correlationId);
    const wallet = await walletRepo.findOneByUserIdOrThrow(event.userId);
    wallet.spend(event.productPrice);
    await walletRepo.save(wallet);
  }
}
