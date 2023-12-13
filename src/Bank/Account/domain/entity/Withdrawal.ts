import {Transaction} from "./Transaction";
import {TransactionId} from "../value-object/TransactionId";
import {TransactionAmount} from "../value-object/TransactionAmount";
import {IncorrectAmount} from "../error/IncorrectAmount";

export class Withdrawal extends Transaction {
    constructor(id: TransactionId, amount: TransactionAmount, createdAt: Date) {
        super(id, amount, createdAt)
        this.ensureIsValidWithdrawalAmount(amount)
    }

    private ensureIsValidWithdrawalAmount(amount: TransactionAmount): void {
        if (!amount.isNegative()) {
            throw new IncorrectAmount(amount, 'withdrawal')
        }
    }
}