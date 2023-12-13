import {DomainEvent} from "../../../../Shared/domain/DomainEvent";

type TransferOutDomainEventAttributes = {
    readonly toAccountId: string
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string
}

export class TransferOutDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'account.transfer.out'
    readonly toAccountId: string
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string

    constructor({
        aggregateId,
        toAccountId,
        transactionId,
        amount,
        createdAt,
        eventId,
        occurredOn
    }: {
        aggregateId: string
        toAccountId: string
        transactionId: string
        eventId?: string
        amount: number
        createdAt: string
        occurredOn?: Date
    }) {
        super({ eventName: TransferOutDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
        this.toAccountId = toAccountId
        this.transactionId = transactionId
        this.amount = amount
        this.createdAt = createdAt
    }

    toPrimitives(): TransferOutDomainEventAttributes {
        const {toAccountId, transactionId, amount, createdAt} = this
        return {
            toAccountId,
            transactionId,
            amount,
            createdAt,
        };
    }
}