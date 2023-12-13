import {TransactionId} from "../../../../Bank/Account/domain/value-object/TransactionId";
import {TransactionAmount} from "../../../../Bank/Account/domain/value-object/TransactionAmount";
import {Deposit} from "../../../../Bank/Account/domain/entity/Deposit";
import {Withdrawal} from "../../../../Bank/Account/domain/entity/Withdrawal";
import {TransactionIdMother} from "./TransactionIdMother";
import {TransactionAmountMother} from "./TransactionAmountMother";

export class TransactionMother {
    static createDeposit(
        id: TransactionId,
        amount: TransactionAmount,
        createdAt: Date,
    ): Deposit {
        return new Deposit(id, amount, createdAt)
    }

    static createWithdrawal(
        id: TransactionId,
        amount: TransactionAmount,
        createdAt: Date,
    ): Withdrawal {
        return new Withdrawal(id, amount, createdAt)
    }

    static randomDeposit(max: number = 500): Deposit {
        return this.createDeposit(
            TransactionIdMother.random(),
            TransactionAmountMother.deposit(max),
            new Date()
        )
    }

    static randomWithdrawal(max: number = 200): Withdrawal {
        return this.createWithdrawal(
            TransactionIdMother.random(),
            TransactionAmountMother.withdrawal(max),
            new Date()
        )
    }

    static createWithdrawalWithAmount(amount: number): Withdrawal {
        return this.createWithdrawal(
            TransactionIdMother.random(),
            TransactionAmountMother.create(amount),
            new Date()
        )
    }

    static createDepositWithAmount(amount: number): Deposit {
        return this.createDeposit(
            TransactionIdMother.random(),
            TransactionAmountMother.create(amount),
            new Date()
        )
    }

    static creator() {
        return () => this.randomDeposit()
    }
}