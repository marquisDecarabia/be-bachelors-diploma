import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormConfig } from '@config/ormconfig';
import { UnitOfWorkModule } from '@src/infrastructure/database/unit-of-work/unit-of-work.module';
import { ProductModule } from '@modules/product/product.module';
import { UserModule } from '@modules/user/user.module';
import { WalletModule } from '@modules/wallet/wallet.module';
import { OrderModule } from '@modules/order/order.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UnitOfWorkModule,
    ProductModule,
    UserModule,
    WalletModule,
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
