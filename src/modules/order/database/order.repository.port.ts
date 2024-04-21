import { RepositoryPort } from '@libs/ddd/domain/ports/repository.ports';
import {
  OrderEntity,
  OrderProps,
} from '@modules/order/domain/entities/order.entity';

export interface OrderRepositoryPort
  extends RepositoryPort<OrderEntity, OrderProps> {
  findOneByIdOrThrow(id: string): Promise<OrderEntity>;
  exists(id: string): Promise<boolean>;
}
