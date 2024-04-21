import { routesV1 } from '@config/app.routes';
import { QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import {
  ProductPaginatedHttpResponse,
  ProductResponse,
} from '@modules/product/dtos/product.response.dto';
import { GetProductsRequest } from '@modules/product/queries/get-products/get-products.request.dto';
import { GetProductsQuery } from '@modules/product/queries/get-products/get-products.query';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Result } from '@libs/ddd/domain/utils/result.util';
import { DataWithPaginationMeta } from '@libs/ddd/domain/ports/repository.ports';

@ApiTags(routesV1.product.tagInfo.name)
@Controller(routesV1.version)
export class GetProductsHttpController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(routesV1.product.root)
  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: ProductPaginatedHttpResponse,
  })
  async getProducts(@Query() request: GetProductsRequest) {
    const query = new GetProductsQuery(request);
    const result: Result<DataWithPaginationMeta<ProductEntity[]>> =
      await this.queryBus.execute(query);
    const unwrappedResult = result.unwrap();
    const products = unwrappedResult.data.map(
      (product) => new ProductResponse(product),
    );
    return new ProductPaginatedHttpResponse({
      data: products,
      count: unwrappedResult.count,
      page: unwrappedResult.page || 1,
      limit: unwrappedResult.limit || 10,
    });
  }
}
