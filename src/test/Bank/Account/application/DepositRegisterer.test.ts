import {AccountMother} from "../domain/AccountMother";
import {TransactionMother} from "../domain/TransactionMother";
import {AccountRepositoryMock} from "../__mocks__/AccountRepositoryMock";
import {DepositRegisterer} from "../../../../Bank/Account/application/DepositRegisterer";
import {EventBusMock} from "../../../Shared/__mocks__/EventBusMock";
import {AccountIdMother} from "../domain/AccountIdMother";
import {DailyDepositAmountExceeded} from "../../../../Bank/Account/domain/error/DailyDepositAmountExceeded";

describe('DepositRegisterer', () => {
    it('registers a deposit', async () => {
        const deposit = TransactionMother.randomDeposit()
        const id = AccountIdMother.random();
        const account = AccountMother.create(id, [])
        const savedAccount = AccountMother.create(id, [deposit])

        const repository = new AccountRepositoryMock()
        repository.returnFind(account)
        const eventBus = new EventBusMock()
        const applicationService = new DepositRegisterer(repository, eventBus)

        await applicationService.run(id, deposit.id, deposit.amount, deposit.createdAt)

        repository.assertFind(id)
        repository.assertSaveHasBeenCalledWith(savedAccount)
    })
    it('Should not register a deposit if it exceeds the daily deposit limit amount', async () => {
        const existingDeposit = TransactionMother.createDepositWithAmount(4800)
        const deposit = TransactionMother.createDepositWithAmount(201)
        const id = AccountIdMother.random();
        const account = AccountMother.create(id, [existingDeposit])

        const repository = new AccountRepositoryMock()
        repository.returnFind(account)
        const eventBus = new EventBusMock()
        const applicationService = new DepositRegisterer(repository, eventBus)

        await expect(
            () => applicationService.run(id, deposit.id, deposit.amount, deposit.createdAt)
        ).rejects.toThrow(new DailyDepositAmountExceeded())
    })
})