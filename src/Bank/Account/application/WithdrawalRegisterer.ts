import {AccountRepository} from "../domain/AccountRepository";
import {EventBus} from "../../../Shared/domain/EventBus";
import {AccountId} from "../domain/value-object/AccountId";
import {TransactionId} from "../domain/value-object/TransactionId";
import {TransactionAmount} from "../domain/value-object/TransactionAmount";
import {Withdrawal} from "../domain/entity/Withdrawal";

export class WithdrawalRegisterer {
    constructor(private accountRepository: AccountRepository, private eventBus: EventBus) {}

    async run(
        id: AccountId, transactionId: TransactionId, amount: TransactionAmount, createdAt: Date
    ): Promise<void> {
        const account = await this.accountRepository.find(id)
        const withdrawal = new Withdrawal(transactionId, amount, createdAt)
        account.withdraw(withdrawal)
        await this.accountRepository.save(account)
        await this.eventBus.publish(account.pullDomainEvents())
    }

}