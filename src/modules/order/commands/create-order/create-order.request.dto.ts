import { CreateOrder } from '@src/interface-adapters/interfaces/order/create.order.interface';
import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CreateOrderRequest implements CreateOrder {
  @ApiProperty({
    example: '0485e3e7-7224-4258-80f3-24c7c94338fa',
    description: 'User id',
  })
  @IsUUID(4)
  readonly userId: string;

  @ApiProperty({
    example: '3ff6a038-ff93-4975-93fa-ee35d33bdabb',
    description: 'Product id',
  })
  @IsUUID(4)
  readonly productId: string;
}

export class CreateOrderHttpRequest
  extends CreateOrderRequest
  implements CreateOrder {}
