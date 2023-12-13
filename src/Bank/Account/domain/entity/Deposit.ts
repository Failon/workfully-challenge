import {Transaction} from "./Transaction";
import {TransactionId} from "../value-object/TransactionId";
import {TransactionAmount} from "../value-object/TransactionAmount";
import {IncorrectAmount} from "../error/IncorrectAmount";

export class Deposit extends Transaction {
    constructor(id: TransactionId, amount: TransactionAmount, createdAt: Date) {
        super(id, amount, createdAt)
        this.ensureIsValidDepositAmount(amount)
    }

    private ensureIsValidDepositAmount(amount: TransactionAmount): void {
        if (!amount.isPositive()) {
            throw new IncorrectAmount(amount, 'deposit')
        }
    }
}