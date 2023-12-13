import {AggregateRoot} from '../../../Shared/domain/AggregateRoot';
import {AccountId} from "./value-object/AccountId";
import {Transaction} from "./entity/Transaction";
import {TransactionRegisteredDomainEvent} from "./event/TransactionRegisteredDomainEvent";
import {DepositRegisteredDomainEvent} from "./event/DepositRegisteredDomainEvent";
import {WithdrawalRegisteredDomainEvent} from "./event/WithdrawalRegisteredDomainEvent";
import {Deposit} from "./entity/Deposit";
import {DailyDepositAmountExceeded} from "./error/DailyDepositAmountExceeded";
import {Withdrawal} from "./entity/Withdrawal";
import {WithdrawalOverdraftExceeded} from "./error/WithdrawalOverdraftExceeded";
import {TransferOverdraftExceeded} from "./error/TransferOverdraftExceeded";
import {OverdraftExceeded} from "./error/OverdraftExceeded";
import {TransferOutDomainEvent} from "./event/TransferOutDomainEvent";
import {TransferInDomainEvent} from "./event/TransferInDomainEvent";

export class Account extends AggregateRoot {
    readonly id: AccountId
    readonly transactions: Array<Transaction>

    constructor(id: AccountId, transactions: Array<Transaction>) {
        super();
        this.id = id
        this.transactions = transactions
    }

    private registerTransaction(transaction: Transaction, event: TransactionRegisteredDomainEvent): void {
        this.transactions.push(transaction)
        this.record(event)
    }

    toPrimitives(): any {
        return {
            id: this.id.value,
            transactions: this.transactions.map(
                function (transaction: Transaction) {
                    return transaction.toPrimitives()
                }
            )
        }
    }

    deposit(deposit: Deposit): void {
        const simulation = [...this.transactions]
        simulation.push(deposit)

        const simulatedTodayDeposits = simulation.filter(
            (transaction: Transaction) =>
                transaction.isDeposit() &&
                transaction.createdAt.toDateString() == deposit.createdAt.toDateString()
        )

        const simulatedTodayTotalDepositAmount = simulatedTodayDeposits.reduce(
            (accumulator: number, transaction: Transaction) => accumulator + transaction.amount.value,
            0
        )

        if (simulatedTodayTotalDepositAmount > DailyDepositAmountExceeded.DAILY_LIMIT) {
            throw new DailyDepositAmountExceeded()
        }

        this.registerTransaction(
            deposit,
            new DepositRegisteredDomainEvent({
                aggregateId: this.id.value,
                transactionId: deposit.id.value,
                amount: deposit.amount.value,
                createdAt: deposit.createdAt.toISOString(),
            })
        );
    }

    withdraw(
        withdrawal: Withdrawal,
        overdraft: OverdraftExceeded = new WithdrawalOverdraftExceeded(withdrawal.amount)
    ): void {
        const simulation = [...this.transactions]
        simulation.push(withdrawal);

        const simulationAmount = simulation.reduce(
            (accumulator: number, transaction: Transaction) => accumulator + transaction.amount.value,
            0
        )

        if (simulationAmount < overdraft.overdraft()) {
            throw overdraft
        }

        this.registerTransaction(
            withdrawal,
            new WithdrawalRegisteredDomainEvent({
                aggregateId: this.id.value,
                transactionId: withdrawal.id.value,
                amount: withdrawal.amount.value,
                createdAt: withdrawal.createdAt.toISOString(),
            })
        )
    }

    transferOut(withdrawal: Withdrawal, toAccountId: AccountId): void {
        this.withdraw(withdrawal, new TransferOverdraftExceeded(withdrawal.amount))
        this.record(
            new TransferOutDomainEvent({
                aggregateId: this.id.value,
                toAccountId: toAccountId.value,
                transactionId: withdrawal.id.value,
                amount: withdrawal.amount.value,
                createdAt: withdrawal.createdAt.toISOString(),
            })
        )
    }

    transferIn(deposit: Deposit, fromAccountId: AccountId): void {
        this.deposit(deposit)
        this.record(
            new TransferInDomainEvent({
                aggregateId: this.id.value,
                fromAccountId: fromAccountId.value,
                transactionId: deposit.id.value,
                amount: deposit.amount.value,
                createdAt: deposit.createdAt.toISOString(),
            })
        )
    }

}