import {Account} from "./Account";
import {AccountId} from "./value-object/AccountId";

export interface AccountRepository {
    save(account: Account): Promise<void>
    find(id: AccountId): Promise<Account>
    transferSave(fromAccount: Account, toAccount: Account): Promise<void>
}