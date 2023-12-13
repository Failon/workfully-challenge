import {TransactionAmount} from "../value-object/TransactionAmount";

export abstract class OverdraftExceeded extends Error {
    protected constructor(amount: TransactionAmount, overdraft: number) {
        super(`<${amount.value * -1}> cannot be withdrawn. ${overdraft} overdraft would be exceeded`);
    }

    abstract overdraft(): number
}
