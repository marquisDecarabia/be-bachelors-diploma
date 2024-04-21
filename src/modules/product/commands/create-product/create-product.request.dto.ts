import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { CreateProduct } from '@src/interface-adapters/interfaces/product/create.product.interface';

export class CreateProductRequest implements CreateProduct {
  @ApiProperty({
    example: 'Lava Lake',
    description: 'Product name',
  })
  @MinLength(2)
  @MaxLength(100)
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 115.0,
    description: 'Product price, format: dddddd.dd',
  })
  @Min(0.01)
  @Max(999999.99)
  @IsNumber({ maxDecimalPlaces: 2 })
  readonly price: number;

  @ApiProperty({
    example: Currencies.USD,
    enum: Currencies,
    description: 'Product price currency',
  })
  @IsEnum(Currencies)
  readonly currency: Currencies;
}

export class CreateProductHttpRequest
  extends CreateProductRequest
  implements CreateProduct {}
