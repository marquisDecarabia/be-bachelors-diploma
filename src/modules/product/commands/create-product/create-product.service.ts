import { CreateProductCommand } from '@modules/product/commands/create-product/create-product.command';
import { CommandHandlerBase } from '@libs/ddd/domain/base-classes/command-handler.base';
import { UnitOfWork } from '@src/infrastructure/database/unit-of-work/unit-of-work';
import { CommandHandler } from '@nestjs/cqrs';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ID } from '@libs/ddd/domain/value-objects/id.value-object';
import { ProductRepositoryPort } from '@modules/product/database/product.repository.port';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@CommandHandler(CreateProductCommand)
export class CreateProductService extends CommandHandlerBase {
  constructor(protected readonly unitOfWork: UnitOfWork) {
    super(unitOfWork);
  }

  async handle(command: CreateProductCommand): Promise<Result<ID>> {
    const product = ProductEntity.create({
      name: command.name,
      currency: command.currency,
      price: command.price,
    });
    const productRepo: ProductRepositoryPort =
      this.unitOfWork.getProductRepository(command.correlationId);
    const created = await productRepo.save(product);
    return Result.ok(created.id);
  }
}
