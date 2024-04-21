import { DomainEvent, DomainEventProps } from '@libs/ddd/domain/domain-events';

export class UserCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.name = props.name;
  }

  readonly name: string;
}
