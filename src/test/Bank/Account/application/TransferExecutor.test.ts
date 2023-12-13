import {TransactionMother} from "../domain/TransactionMother";
import {AccountMother} from "../domain/AccountMother";
import {AccountRepositoryMock} from "../__mocks__/AccountRepositoryMock";
import {EventBusMock} from "../../../Shared/__mocks__/EventBusMock";
import {TransferExecutor} from "../../../../Bank/Account/application/TransferExecutor";
import {AccountIdMother} from "../domain/AccountIdMother";
import {TransferOverdraftExceeded} from "../../../../Bank/Account/domain/error/TransferOverdraftExceeded";

describe('TransferExecutor', () => {
    it('Executes a Transfer', async () => {
        const deposit = TransactionMother.createDepositWithAmount(200)
        const withdrawal = TransactionMother.createWithdrawalWithAmount(-200)
        const fromAccount = AccountMother.random()
        const toAccount = AccountMother.random()

        const fromAccountSaved = AccountMother.create(
            fromAccount.id,
            [...fromAccount.transactions, withdrawal]
        )
        const toAccountSaved = AccountMother.create(
            toAccount.id,
            [...toAccount.transactions, deposit]
        )

        const repository = new AccountRepositoryMock()
        repository.returnFind(fromAccount)
        repository.returnFind(toAccount)
        const eventBus = new EventBusMock()
        const applicationService = new TransferExecutor(repository, eventBus)

        await applicationService.run(fromAccount.id, toAccount.id, withdrawal.id, deposit.id, deposit.amount, deposit.createdAt)

        repository.assertFind(fromAccount.id)
        repository.assertFind(toAccount.id)
        repository.assertTransferSaveHasBeenCalledWith(fromAccountSaved, toAccountSaved)
    })
    it('Should not execute transfer if it exceeds the from account transfer overdraft', async () => {
        const deposit = TransactionMother.createDepositWithAmount(200)
        const withdrawal = TransactionMother.createWithdrawalWithAmount(-200)
        const fromAccount = AccountMother.create(AccountIdMother.random(), [])
        const toAccount = AccountMother.random()

        const repository = new AccountRepositoryMock()
        repository.returnFind(fromAccount)
        repository.returnFind(toAccount)
        const eventBus = new EventBusMock()
        const applicationService = new TransferExecutor(repository, eventBus)

        await expect(
            () => applicationService.run(
                fromAccount.id, toAccount.id, withdrawal.id, deposit.id, deposit.amount, deposit.createdAt
            )
        ).rejects.toThrow(new TransferOverdraftExceeded(withdrawal.amount))
    })
})