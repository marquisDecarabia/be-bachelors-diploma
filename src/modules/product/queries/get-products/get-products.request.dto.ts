import { GetProducts } from '@src/interface-adapters/interfaces/product/get.products.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class GetProductsRequest implements GetProducts {
  @ApiProperty({
    description: 'How many items page will contain',
    type: Number,
    example: 10,
  })
  @IsInt()
  @Min(1)
  readonly limit: number;

  @ApiProperty({
    description: 'Pagination page',
    type: Number,
    example: 1,
  })
  @IsInt()
  @Min(1)
  readonly page: number;
}

export class GetProductsHttpRequest
  extends GetProductsRequest
  implements GetProducts {}
