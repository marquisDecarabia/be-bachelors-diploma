import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from '@modules/product/database/product.orm-entity';
import { ProductRepository } from '@modules/product/database/product.repository';
import { CreateProductService } from '@modules/product/commands/create-product/create-product.service';
import { GetProductsQueryHandler } from '@modules/product/queries/get-products/get-products.query-handler';
import { GetProductsHttpController } from '@modules/product/queries/get-products/get-products.http.controller';
import { CreateProductHttpController } from '@modules/product/commands/create-product/create-product.http.controller';
import { changeStatusWhenOrderIsCreatedProvider } from '@modules/product/product.providers';

const httpControllers = [
  GetProductsHttpController,
  CreateProductHttpController,
];

const repositories = [ProductRepository];

const queryHandlers = [GetProductsQueryHandler];

const commandHandlers = [CreateProductService];

const eventProviders = [changeStatusWhenOrderIsCreatedProvider];

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity]), CqrsModule],
  controllers: [...httpControllers],
  providers: [
    ...repositories,
    ...queryHandlers,
    ...commandHandlers,
    ...eventProviders,
  ],
})
export class ProductModule {}
