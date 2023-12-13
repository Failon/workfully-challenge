import { ValueObject } from './ValueObject';

export abstract class NumberValueObject extends ValueObject<number> {
    isBiggerThan(other: NumberValueObject): boolean {
        return this.value > other.value;
    }

    isNegative(): boolean {
        return this.value < 0
    }

    isPositive(): boolean {
        return this.value > 0
    }
}