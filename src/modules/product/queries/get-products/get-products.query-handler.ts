import { QueryHandler } from '@nestjs/cqrs';
import { GetProductsQuery } from '@modules/product/queries/get-products/get-products.query';
import { QueryHandlerBase } from '@libs/ddd/domain/base-classes/query-handler.base';
import { ProductRepository } from '@modules/product/database/product.repository';
import { DataWithPaginationMeta } from '@libs/ddd/domain/ports/repository.ports';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';

@QueryHandler(GetProductsQuery)
export class GetProductsQueryHandler extends QueryHandlerBase {
  constructor(private readonly productRepo: ProductRepository) {
    super();
  }

  async handle(
    query: GetProductsQuery,
  ): Promise<Result<DataWithPaginationMeta<ProductEntity[]>>> {
    const paginatedProducts = await this.productRepo.findManyPaginated({
      pagination: query,
    });
    return Result.ok(paginatedProducts);
  }
}
