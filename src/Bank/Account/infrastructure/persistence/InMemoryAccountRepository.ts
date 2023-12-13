import {AccountRepository} from "../../domain/AccountRepository";
import {Account} from "../../domain/Account";
import {AccountId} from "../../domain/value-object/AccountId";

export class InMemoryAccountRepository implements AccountRepository {
    async find(id: AccountId): Promise<Account> {
        return new Account(id, [])
    }

    async save(account: Account): Promise<void> {
    }

    async transferSave(fromAccount: Account, toAccount: Account): Promise<void> {
    }
}