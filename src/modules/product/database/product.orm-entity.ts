import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { ProductStatuses } from '@modules/product/domain/entities/product.types';
import { ColumnNumericTransformer } from '@src/infrastructure/database/transformers/column-numeric.transformer';

@Entity('product')
export class ProductOrmEntity extends TypeormEntityBase {
  constructor(props?: ProductOrmEntity) {
    super(props);
  }

  @Column()
  name: string;

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ type: 'enum', enum: Currencies })
  currency: Currencies;

  @Column({ type: 'enum', enum: ProductStatuses })
  status: ProductStatuses;
}
