export class DailyDepositAmountExceeded extends Error {
    static readonly DAILY_LIMIT = 5000
    constructor() {
        super(`Cannot register deposit. Daily Limit amount of ${5000} would be exceeded.`);
    }
}