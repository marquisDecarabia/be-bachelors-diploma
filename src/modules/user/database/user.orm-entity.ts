import { TypeormEntityBase } from '@libs/ddd/infrastructure/database/base-classes/typeorm.entity.base';
import { Column, Entity } from 'typeorm';

@Entity('user')
export class UserOrmEntity extends TypeormEntityBase {
  constructor(props?: UserOrmEntity) {
    super(props);
  }

  @Column()
  name: string;

  @Column({ unique: true, type: "citext" })
  email: string;
}
