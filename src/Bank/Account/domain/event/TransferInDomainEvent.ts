import {DomainEvent} from "../../../../Shared/domain/DomainEvent";

type TransferInDomainEventAttributes = {
    readonly fromAccountId: string
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string
}

export class TransferInDomainEvent extends DomainEvent {
    static readonly EVENT_NAME: string = 'account.transfer.in'
    readonly fromAccountId: string
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string

    constructor({
        aggregateId,
        fromAccountId,
        transactionId,
        amount,
        createdAt,
        eventId,
        occurredOn
    }: {
        aggregateId: string
        fromAccountId: string
        transactionId: string
        eventId?: string
        amount: number
        createdAt: string
        occurredOn?: Date
    }) {
        super({ eventName: TransferInDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
        this.fromAccountId = fromAccountId
        this.transactionId = transactionId
        this.amount = amount
        this.createdAt = createdAt
    }

    toPrimitives(): TransferInDomainEventAttributes {
        const {fromAccountId, transactionId, amount, createdAt} = this
        return {
            fromAccountId,
            transactionId,
            amount,
            createdAt,
        };
    }
}