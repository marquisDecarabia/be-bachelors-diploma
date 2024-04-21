import { TypeormUnitOfWork } from '@src/libs/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UserRepository } from '@modules/user/database/user.repository';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import { WalletRepository } from '@modules/wallet/database/wallet.repository';
import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@modules/product/database/product.repository';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';
import { OrderRepository } from '@modules/order/database/order.repository';
import { OrderOrmEntity } from '@modules/order/database/order.orm-entity';

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {
  // Add new repositories below to use this generic UnitOfWork

  // Convert TypeOrm Repository to a Domain Repository
  getUserRepository(correlationId: string): UserRepository {
    return new UserRepository(
      this.getOrmRepository(UserOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getWalletRepository(correlationId: string): WalletRepository {
    return new WalletRepository(
      this.getOrmRepository(WalletOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getProductRepository(correlationId: string): ProductRepository {
    return new ProductRepository(
      this.getOrmRepository(ProductOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }

  getOrderRepository(correlationId: string): OrderRepository {
    return new OrderRepository(
      this.getOrmRepository(OrderOrmEntity, correlationId),
    ).setCorrelationId(correlationId);
  }
}
