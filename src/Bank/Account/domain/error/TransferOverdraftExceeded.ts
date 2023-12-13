import {OverdraftExceeded} from "./OverdraftExceeded";
import {TransactionAmount} from "../value-object/TransactionAmount";

export class TransferOverdraftExceeded extends OverdraftExceeded {
    static readonly OVERDRAFT: number = 0

    constructor(amount: TransactionAmount) {
        super(amount, TransferOverdraftExceeded.OVERDRAFT);
    }

    overdraft(): number {
        return TransferOverdraftExceeded.OVERDRAFT;
    }
}