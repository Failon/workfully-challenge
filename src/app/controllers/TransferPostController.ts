import { Request, Response } from 'express';
import httpStatus from 'http-status';
import {Controller} from "./Controller";
import {AccountId} from "../../Bank/Account/domain/value-object/AccountId";
import {TransactionId} from "../../Bank/Account/domain/value-object/TransactionId";
import {TransactionAmount} from "../../Bank/Account/domain/value-object/TransactionAmount";
import {TransferExecutor} from "../../Bank/Account/application/TransferExecutor";

type ExecuteTransferRequest = {
    fromAccountId: string
    toAccountId: string
    depositId: string
    withdrawalId: string
    amount: number
}

export class TransferPostController implements Controller {
    constructor(private readonly applicationService: TransferExecutor) {}

    async run(req: Request, res: Response): Promise<void> {
        await this.applicationService.run(
            new AccountId(req.body.fromAccountId),
            new AccountId(req.body.toAccountId),
            new TransactionId(req.body.depositId),
            new TransactionId(req.body.withdrawalId),
            new TransactionAmount(req.body.amount),
            new Date()
        ).then(
            () => res.status(httpStatus.OK).send()
        ).catch(
            error => res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message)
        )
    }
}