import {TransactionAmount} from "../../../../Bank/Account/domain/value-object/TransactionAmount";
import {IntegerMother} from "../../../Shared/domain/IntegerMother";

export class TransactionAmountMother {
    static create(value: number): TransactionAmount {
        return new TransactionAmount(value)
    }

    static deposit(max: number = 500): TransactionAmount {
        return this.create(IntegerMother.random(max))
    }

    static withdrawal(max: number = 200): TransactionAmount {
        return this.deposit(max).oppositeSign()
    }
}