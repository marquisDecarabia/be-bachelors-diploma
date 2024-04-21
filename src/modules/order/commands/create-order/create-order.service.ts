import { CommandHandler } from '@nestjs/cqrs';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CreateOrderCommand } from '@modules/order/commands/create-order/create-order.command';
import {
  NotEnoughFundsError,
  ProductUnavailableError,
} from '@modules/order/errors/order.errors';
import { ProductStatuses } from '@modules/product/domain/entities/product.types';
import { OrderEntity } from '@modules/order/domain/entities/order.entity';

@CommandHandler(CreateOrderCommand)
export class CreateOrderService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(
    command: CreateOrderCommand,
  ): Promise<Result<ID, ProductUnavailableError | NotEnoughFundsError>> {
    const productRepo = this.unitOfWork.getProductRepository(
      command.correlationId,
    );

    const product = await productRepo.findOneByIdOrThrow(command.productId);

    if (product.status !== ProductStatuses.available) {
      return Result.err(new ProductUnavailableError());
    }

    const walletRepo = this.unitOfWork.getWalletRepository(
      command.correlationId,
    );

    const wallet = await walletRepo.findOneByUserIdOrThrow(command.userId);

    if (Number(wallet.balance) < Number(product.price)) {
      return Result.err(new NotEnoughFundsError());
    }

    const orderRepo = this.unitOfWork.getOrderRepository(command.correlationId);

    const order = OrderEntity.create({
      userId: new UUID(command.userId),
      productId: new UUID(command.productId),
      productInfo: product.productInfo,
      productPrice: product.price,
    });

    const created = await orderRepo.save(order);

    return Result.ok(created.id);
  }
}
