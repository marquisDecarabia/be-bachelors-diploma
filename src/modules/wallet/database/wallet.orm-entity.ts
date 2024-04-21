import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';
import { Currencies } from '@libs/ddd/domain/types/currency.enum';
import { ColumnNumericTransformer } from '@src/infrastructure/database/transformers/column-numeric.transformer';

@Entity('wallet')
export class WalletOrmEntity extends TypeormEntityBase {
  constructor(props?: WalletOrmEntity) {
    super(props);
  }

  @Column({
    type: 'numeric',
    precision: 8,
    scale: 2,
    default: 0.0,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @Column({ unique: true })
  userId: string;

  @Column({ type: 'enum', enum: Currencies })
  currency: Currencies;
}
