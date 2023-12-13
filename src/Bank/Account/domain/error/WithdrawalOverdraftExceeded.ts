import {OverdraftExceeded} from "./OverdraftExceeded";
import {TransactionAmount} from "../value-object/TransactionAmount";

export class WithdrawalOverdraftExceeded extends OverdraftExceeded {
    static readonly OVERDRAFT: number = -200

    constructor(amount: TransactionAmount) {
        super(amount, WithdrawalOverdraftExceeded.OVERDRAFT);
    }

    overdraft(): number {
        return WithdrawalOverdraftExceeded.OVERDRAFT;
    }
}