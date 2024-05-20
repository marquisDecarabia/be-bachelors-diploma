import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  UserEntity,
  UserProps,
} from '@modules/user/domain/entities/user.entity';
import { UserOrmEntity } from '@modules/user/database/user.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import {EmailVO} from "@libs/ddd/domain/value-objects/email.value-object";

export class UserOrmMapper extends OrmMapper<UserEntity, UserOrmEntity> {
  protected toOrmProps(entity: UserEntity): OrmEntityProps<UserOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<UserOrmEntity> = {
      name: props.name,
      email: props.email.value,
    };
    return ormProps;
  }

  protected toDomainProps(ormEntity: UserOrmEntity): EntityProps<UserProps> {
    const id = new UUID(ormEntity.id);
    const props: UserProps = {
      name: ormEntity.name,
      email: new EmailVO(ormEntity.email),
    };
    return { id, props };
  }
}
