import { Provider } from '@nestjs/common';
import { ChangeStatusWhenOrderIsCreatedDomainEventHandler } from '@modules/product/application/event-handlers/change-status-when-order-is-created.domain-event-handler';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';

export const changeStatusWhenOrderIsCreatedProvider: Provider = {
  provide: ChangeStatusWhenOrderIsCreatedDomainEventHandler,
  useFactory: (
    unitOfWork: UnitOfWork,
  ): ChangeStatusWhenOrderIsCreatedDomainEventHandler => {
    const eventHandler = new ChangeStatusWhenOrderIsCreatedDomainEventHandler(
      unitOfWork,
    );
    eventHandler.listen();
    return eventHandler;
  },
  inject: [UnitOfWork],
};
