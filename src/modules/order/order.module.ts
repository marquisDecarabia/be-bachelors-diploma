import { CreateOrderHttpController } from '@modules/order/commands/create-order/create-order.http.controller';
import { OrderRepository } from '@modules/order/database/order.repository';
import { CreateOrderService } from '@modules/order/commands/create-order/create-order.service';
import { OrderOrmEntity } from '@modules/order/database/order.orm-entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Module } from '@nestjs/common';

const httpControllers = [CreateOrderHttpController];

const repositories = [OrderRepository];

const commandHandlers = [CreateOrderService];

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [...repositories, ...commandHandlers],
})
export class OrderModule {}
