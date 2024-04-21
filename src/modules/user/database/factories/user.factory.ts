import { NonFunctionProperties } from '@libs/types';
import { define } from 'typeorm-seeding';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';

define(UserOrmEntity, (_, user: NonFunctionProperties<UserOrmEntity>) => {
  return new UserOrmEntity(user);
});
