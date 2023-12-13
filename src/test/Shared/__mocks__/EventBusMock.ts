import {EventBus} from "../../../Shared/domain/EventBus";
import {DomainEventSubscriber} from "../../../Shared/domain/DomainEventSubscriber";
import {DomainEvent} from "../../../Shared/domain/DomainEvent";

// noinspection TypeScriptValidateTypes
export class EventBusMock implements EventBus {
    private mockPublish = jest.fn()

    addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent>>): void {
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        this.mockPublish(events)
    }

    assertPublishHasBeenCalledWith(events: Array<DomainEvent>): void {
        expect(this.mockPublish).toHaveBeenCalledWith(events)
    }
}