import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event';
import { WalletRepositoryPort } from '@modules/wallet/database/wallet.repository.port';
import { DomainEventHandler } from '@libs/ddd/domain/domain-events';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { WalletEntity } from '../../domain/entities/wallet.entity';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';

export class CreateWalletWhenUserIsCreatedDomainEventHandler extends DomainEventHandler {
  constructor(private readonly unitOfWork: UnitOfWork) {
    super(UserCreatedDomainEvent);
  }

  async handle(event: UserCreatedDomainEvent): Promise<void> {
    const walletRepo: WalletRepositoryPort =
      this.unitOfWork.getWalletRepository(event.correlationId);
    const wallet = WalletEntity.create({
      userId: new UUID(event.aggregateId),
      currency: Currencies.USD,
    });
    await walletRepo.save(wallet);
  }
}
