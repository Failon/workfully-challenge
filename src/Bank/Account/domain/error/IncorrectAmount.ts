import {TransactionAmount} from "../value-object/TransactionAmount";

export class IncorrectAmount extends Error {
    constructor(amount: TransactionAmount, transactionType: string) {
        const sign = transactionType === 'deposit' ? 'positive' : 'negative'
        super(`<${amount.value}> is an invalid amount for a ${transactionType}. Amount must be ${sign}`);
    }
}