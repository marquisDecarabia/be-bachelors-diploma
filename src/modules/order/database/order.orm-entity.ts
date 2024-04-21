import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('order')
export class OrderOrmEntity extends TypeormEntityBase {
  constructor(props?: OrderOrmEntity) {
    super(props);
  }

  @Column()
  userId: string;

  @Column()
  productId: string;

  @Column()
  productInfo: string;
}
