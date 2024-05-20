import { AggregateRoot } from '@libs/ddd/domain/base-classes/aggregate-root.base';
import { UUID } from '@libs/ddd/domain/value-objects/uuid.value-object';
import { UserCreatedDomainEvent } from '@modules/user/domain/events/user-created.domain-event';
import { ArgumentInvalidException } from '@exceptions';
import { EmailVO } from "@libs/ddd/domain/value-objects/email.value-object";

export interface CreateUserProps {
  name: string;
  email: EmailVO;
}

export type UserProps = CreateUserProps;

export class UserEntity extends AggregateRoot<UserProps> {
  protected readonly _id: UUID;

  static create(create: CreateUserProps): UserEntity {
    const id = UUID.generate();

    const props: UserProps = { ...create };

    const user = new UserEntity({ id, props });
    user.addEvent(
      new UserCreatedDomainEvent({
        aggregateId: id.value,
        name: props.name,
      }),
    );
    return user;
  }

  static validate(props: UserProps): void {
    if (props.name.length === 0) {
      throw new ArgumentInvalidException('Name cannot be empty');
    }
  }

  public get email(): EmailVO {
    return this.props.email;
  }
}
