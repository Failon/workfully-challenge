import {EventBus} from "./EventBus";
import {DomainEventSubscriber} from "./DomainEventSubscriber";
import {DomainEvent} from "./DomainEvent";

export class InMemoryEventBus implements EventBus {
    addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {}

    async publish(events: Array<DomainEvent>): Promise<void> {}
}