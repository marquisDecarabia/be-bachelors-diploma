import { ResponseBase } from '@libs/ddd/interface-adapters/base-classes/response.base';
import { ProductEntity } from '@modules/product/domain/entities/product.entity';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { ProductStatuses } from '@modules/product/domain/entities/product.types';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@src/interface-adapters/interfaces/product/product.interface';
import { ResponsePaginated } from '@libs/ddd/interface-adapters/base-classes/response.paginated';
import { Paginated } from '@libs/ddd/interface-adapters/interfaces/paginated.interface';

export class ProductResponse extends ResponseBase implements Product {
  constructor(product: ProductEntity) {
    super(product);
    const props = product.getPropsCopy();
    this.name = props.name;
    this.price = props.price;
    this.currency = props.currency;
    this.status = props.status;
  }

  @ApiProperty({
    example: 'Palm Park',
    description: 'Product name',
  })
  name: string;

  @ApiProperty({
    example: 46,
    description: 'Product price',
  })
  price: number;

  @ApiProperty({
    example: Currencies.USD,
    enum: Currencies,
    description: 'Product price currency',
  })
  currency: Currencies;

  @ApiProperty({
    example: ProductStatuses.available,
    enum: ProductStatuses,
    description: 'Product status',
  })
  status: ProductStatuses;
}

// export class ProductHttpResponse extends ProductResponse implements Product {}

export class ProductPaginatedResponse extends ResponsePaginated<ProductResponse> {
  constructor(props: Paginated<ProductResponse>) {
    super(props);
    this.data = props.data;
  }

  @ApiProperty({
    isArray: true,
    type: ProductResponse,
    description: 'Product list for current page',
  })
  data: ProductResponse[];
}

export class ProductPaginatedHttpResponse extends ProductPaginatedResponse {
  constructor(props: Paginated<ProductResponse>) {
    super(props);
  }
}
