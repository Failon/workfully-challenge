import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {Controller} from "./Controller";
import {AccountId} from "../../Bank/Account/domain/value-object/AccountId";
import {TransactionId} from "../../Bank/Account/domain/value-object/TransactionId";
import {TransactionAmount} from "../../Bank/Account/domain/value-object/TransactionAmount";
import {WithdrawalRegisterer} from "../../Bank/Account/application/WithdrawalRegisterer";

type RegisterWithdrawalRequest = {
    id: string
    transactionId: string
    amount: number
}

export class WithdrawalPostController implements Controller {
    constructor(private readonly applicationService: WithdrawalRegisterer) {}

    async run(req: Request, res: Response): Promise<void> {
        await this.applicationService.run(
            new AccountId(req.body.id),
            new TransactionId(req.body.transactionId),
            new TransactionAmount(req.body.amount),
            new Date()
        ).then(
            () => res.status(httpStatus.OK).send()
        ).catch(
            error => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
        )
    }
}