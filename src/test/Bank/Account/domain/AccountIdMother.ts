import {AccountId} from "../../../../Bank/Account/domain/value-object/AccountId";
import {UuidMother} from "../../../Shared/domain/UuidMother";

export class AccountIdMother {
    static create(value: string): AccountId {
        return new AccountId(value)
    }

    static random(): AccountId {
        return this.create(UuidMother.random())
    }
}