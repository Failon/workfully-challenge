import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {Controller} from "./Controller";
import {DepositRegisterer} from "../../Bank/Account/application/DepositRegisterer";
import {AccountId} from "../../Bank/Account/domain/value-object/AccountId";
import {TransactionId} from "../../Bank/Account/domain/value-object/TransactionId";
import {TransactionAmount} from "../../Bank/Account/domain/value-object/TransactionAmount";

type RegisterDepositRequest = {
    id: string
    transactionId: string
    amount: number
}

export class DepositPostController implements Controller {
    constructor(private readonly applicationService: DepositRegisterer) {}

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