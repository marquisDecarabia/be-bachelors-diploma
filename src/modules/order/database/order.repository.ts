import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@libs/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryParams } from '@libs/ddd/domain/ports/repository.ports';
import { NotFoundException } from '@exceptions';
import {
  OrderEntity,
  OrderProps,
} from '@modules/order/domain/entities/order.entity';
import { OrderRepositoryPort } from '@modules/order/database/order.repository.port';
import { Repository } from 'typeorm';
import { OrderOrmEntity } from '@modules/order/database/order.orm-entity';
import { OrderOrmMapper } from '@modules/order/database/order.orm-mapper';

@Injectable()
export class OrderRepository
  extends TypeormRepositoryBase<OrderEntity, OrderProps, OrderOrmEntity>
  implements OrderRepositoryPort
{
  protected relations: string[] = [];

  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly OrderRepository: Repository<OrderOrmEntity>,
  ) {
    super(
      OrderRepository,
      new OrderOrmMapper(OrderEntity, OrderOrmEntity),
      new ConsoleLogger('OrderRepository'),
    );
  }

  private async findOneById(id: string): Promise<OrderOrmEntity | undefined> {
    return await this.OrderRepository.findOne({
      where: { id },
    });
  }

  async findOneByIdOrThrow(id: string): Promise<OrderEntity> {
    const order = await this.findOneById(id);
    if (!order) {
      throw new NotFoundException(`Order with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(order);
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.findOneById(id);
    return !!found;
  }

  // Used to construct a query
  protected prepareQuery(
    params: QueryParams<OrderProps>,
  ): WhereCondition<OrderOrmEntity> {
    const where: QueryParams<OrderOrmEntity> = {};
    if (params.id) {
      where.id = params.id.value;
    }
    if (params.userId) {
      where.userId = params.userId.value;
    }
    if (params.productId) {
      where.productId = params.productId.value;
    }
    return where;
  }
}
