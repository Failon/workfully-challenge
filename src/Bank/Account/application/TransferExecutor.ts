import {AccountRepository} from "../domain/AccountRepository";
import {EventBus} from "../../../Shared/domain/EventBus";
import {AccountId} from "../domain/value-object/AccountId";
import {TransactionId} from "../domain/value-object/TransactionId";
import {TransactionAmount} from "../domain/value-object/TransactionAmount";
import {Deposit} from "../domain/entity/Deposit";
import {Withdrawal} from "../domain/entity/Withdrawal";

export class TransferExecutor {
    constructor(private accountRepository: AccountRepository, private eventBus: EventBus) {}

    async run (
        fromAccountId: AccountId,
        toAccountId: AccountId,
        withdrawalId: TransactionId,
        depositId: TransactionId,
        transferAmount: TransactionAmount,
        date: Date
    ): Promise<void> {
        const fromAccount = await this.accountRepository.find(fromAccountId)
        const toAccount = await this.accountRepository.find(toAccountId)
        const deposit = new Deposit(depositId, transferAmount, date)
        const withdrawal = new Withdrawal(withdrawalId, transferAmount.oppositeSign(), date)

        fromAccount.transferOut(withdrawal, toAccountId)
        toAccount.transferIn(deposit, fromAccountId)

        await this.accountRepository.transferSave(fromAccount, toAccount)
        await this.eventBus.publish(fromAccount.pullDomainEvents())
        await this.eventBus.publish(toAccount.pullDomainEvents())
    }
}