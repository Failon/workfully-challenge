import {NumberValueObject} from "../../../../Shared/domain/value-object/NumberValueObject";

export class TransactionAmount extends NumberValueObject {
    oppositeSign(): TransactionAmount {
        return new TransactionAmount(this.value * -1)
    }
}