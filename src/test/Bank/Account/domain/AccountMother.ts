import {Account} from "../../../../Bank/Account/domain/Account";
import {AccountId} from "../../../../Bank/Account/domain/value-object/AccountId";
import {Transaction} from "../../../../Bank/Account/domain/entity/Transaction";
import {TransactionIdMother} from "./TransactionIdMother";
import {Repeater} from "../../../Shared/domain/Repeater";
import {TransactionMother} from "./TransactionMother";

export class AccountMother {
    static create(
        id: AccountId,
        transactions: Array<Transaction>
    ): Account {
        return new Account(
            id,
            transactions
        )
    }

    static random(iterations: number = 5): Account {
        return this.create(
            TransactionIdMother.random(),
            Repeater.random(TransactionMother.creator(), iterations)
        )
    }
}