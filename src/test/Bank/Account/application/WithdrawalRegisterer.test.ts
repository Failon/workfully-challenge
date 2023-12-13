import {AccountMother} from "../domain/AccountMother";
import {TransactionMother} from "../domain/TransactionMother";
import {AccountRepositoryMock} from "../__mocks__/AccountRepositoryMock";
import {EventBusMock} from "../../../Shared/__mocks__/EventBusMock";
import {WithdrawalRegisterer} from "../../../../Bank/Account/application/WithdrawalRegisterer";
import {AccountIdMother} from "../domain/AccountIdMother";
import {WithdrawalOverdraftExceeded} from "../../../../Bank/Account/domain/error/WithdrawalOverdraftExceeded";

describe('WithdrawalRegisterer', () => {
    it('registers a withdrawal', async () => {
        const withdrawal = TransactionMother.randomWithdrawal()
        const id = AccountIdMother.random();
        const account = AccountMother.create(id, [])
        const savedAccount = AccountMother.create(id, [withdrawal])

        const repository = new AccountRepositoryMock()
        repository.returnFind(account)
        const eventBus = new EventBusMock()
        const applicationService = new WithdrawalRegisterer(repository, eventBus)

        await applicationService.run(id, withdrawal.id, withdrawal.amount, withdrawal.createdAt)

        repository.assertFind(id)
        repository.assertSaveHasBeenCalledWith(savedAccount)
    })
    it('should not register a withdrawal if it exceeds the overdraft limit', async () => {
        const id = AccountIdMother.random()
        const deposit = TransactionMother.createDepositWithAmount(200);
        const withdrawal = TransactionMother.createWithdrawalWithAmount(-401)
        const account = AccountMother.create(id, [deposit])

        const repository = new AccountRepositoryMock()
        repository.returnFind(account)
        const eventBus = new EventBusMock()
        const applicationService = new WithdrawalRegisterer(repository, eventBus)

        await expect(
            () => applicationService.run(id, withdrawal.id, withdrawal.amount, withdrawal.createdAt)
        ).rejects.toThrow(new WithdrawalOverdraftExceeded(withdrawal.amount))
    })
})