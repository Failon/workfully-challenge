import {TransactionAmount} from "../value-object/TransactionAmount";
import {TransactionId} from "../value-object/TransactionId";

export abstract class Transaction {
    readonly id: TransactionId
    readonly amount: TransactionAmount
    readonly createdAt: Date

    protected constructor(id: TransactionId, amount: TransactionAmount, createdAt: Date) {
        this.id = id
        this.amount = amount
        this.createdAt = createdAt
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
            amount: this.amount.value,
            createdAt: this.createdAt.toISOString()
        }
    }

    isDeposit(): boolean {
        return this.amount.isPositive()
    }

    isWithdrawal(): boolean {
        return this.amount.isNegative()
    }
}