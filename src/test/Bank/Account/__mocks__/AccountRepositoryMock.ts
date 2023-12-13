import {AccountRepository} from "../../../../Bank/Account/domain/AccountRepository";
import {AccountId} from "../../../../Bank/Account/domain/value-object/AccountId";
import {Account} from "../../../../Bank/Account/domain/Account";

// noinspection TypeScriptValidateTypes
export class AccountRepositoryMock implements AccountRepository {
    private mockFind = jest.fn()
    private mockSave = jest.fn()
    private mockTransferSave = jest.fn()
    private accounts: Array<Account> = []

    returnFind(account: Account): void {
        this.accounts.push(account)
    }

    async find(id: AccountId): Promise<Account> {
        this.mockFind(id)
        const account = this.accounts[0]
        this.accounts.shift()
        return account
    }

    assertFind(id: AccountId) {
        expect(this.mockFind).toHaveBeenCalledWith(id)
    }

    async save(account: Account): Promise<void> {
        this.mockSave(account)
    }

    assertSaveHasBeenCalledWith(account: Account): void {
        expect(this.mockSave).toHaveBeenCalledWith(account)
    }

    async transferSave(fromAccount: Account, toAccount: Account): Promise<void> {
        this.mockTransferSave(fromAccount, toAccount)
    }

    assertTransferSaveHasBeenCalledWith(fromAccount: Account, toAccount: Account): void {
        expect(this.mockTransferSave).toHaveBeenCalledWith(fromAccount, toAccount)
    }
}