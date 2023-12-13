import {TransactionId} from "../../../../Bank/Account/domain/value-object/TransactionId";
import {UuidMother} from "../../../Shared/domain/UuidMother";

export class TransactionIdMother {
    static create(value: string): TransactionId {
        return new TransactionId(value)
    }

    static random(): TransactionId {
        return this.create(UuidMother.random())
    }
}