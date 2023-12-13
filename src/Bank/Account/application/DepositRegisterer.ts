import {AccountRepository} from "../domain/AccountRepository";
import {EventBus} from "../../../Shared/domain/EventBus";
import {AccountId} from "../domain/value-object/AccountId";
import {TransactionAmount} from "../domain/value-object/TransactionAmount";
import {TransactionId} from "../domain/value-object/TransactionId";
import {Deposit} from "../domain/entity/Deposit";

export class DepositRegisterer {
    constructor(private accountRepository: AccountRepository, private eventBus: EventBus) {}

    async run(
        id: AccountId, transactionId: TransactionId, amount: TransactionAmount, createdAt: Date
    ): Promise<void> {
        const account = await this.accountRepository.find(id)
        const deposit = new Deposit(transactionId, amount, createdAt)
        account.deposit(deposit)
        await this.accountRepository.save(account)
        await this.eventBus.publish(account.pullDomainEvents())
    }
}