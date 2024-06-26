import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/ddd/infrastructure/database/base-classes/orm-mapper.base';
import {
  WalletEntity,
  WalletProps,
} from '@modules/wallet/domain/entities/wallet.entity';
import { WalletOrmEntity } from '@modules/wallet/database/wallet.orm-entity';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';

export class WalletOrmMapper extends OrmMapper<WalletEntity, WalletOrmEntity> {
  protected toOrmProps(entity: WalletEntity): OrmEntityProps<WalletOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<WalletOrmEntity> = {
      userId: props.userId.value,
      balance: props.balance,
      currency: props.currency,
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: WalletOrmEntity,
  ): EntityProps<WalletProps> {
    const id = new UUID(ormEntity.id);
    const props: WalletProps = {
      userId: new UUID(ormEntity.userId),
      balance: ormEntity.balance,
      currency: ormEntity.currency,
    };
    return { id, props };
  }
}
