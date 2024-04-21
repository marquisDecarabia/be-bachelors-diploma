import { DomainEvent, DomainEventClass, DomainEvents } from './index';

export abstract class DomainEventHandler {
  protected constructor(private readonly event: DomainEventClass) {}

  abstract handle(event: DomainEvent): Promise<void>;

  public listen(): void {
    DomainEvents.subscribe(this.event, this);
  }
}
