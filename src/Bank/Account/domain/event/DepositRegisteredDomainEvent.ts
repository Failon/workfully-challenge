import {TransactionRegisteredDomainEvent} from "./TransactionRegisteredDomainEvent";

type RegisterDepositDomainEventAttributes = {
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string
}

export class DepositRegisteredDomainEvent extends TransactionRegisteredDomainEvent {
    static readonly EVENT_NAME: string = 'account.deposit.registered'
    readonly transactionId: string
    readonly amount: number
    readonly createdAt: string

    constructor({
        aggregateId,
        transactionId,
        amount,
        createdAt,
        eventId,
        occurredOn
    }: {
        aggregateId: string;
        transactionId: string;
        eventId?: string;
        amount: number;
        createdAt: string;
        occurredOn?: Date;
    }) {
        super({ eventName: DepositRegisteredDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn });
        this.transactionId = transactionId
        this.amount = amount
        this.createdAt = createdAt
    }

    toPrimitives(): RegisterDepositDomainEventAttributes {
        const {transactionId, amount, createdAt} = this
        return {
            transactionId,
            amount,
            createdAt,
        };
    }

}