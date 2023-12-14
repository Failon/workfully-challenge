import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
  const requestSchema = [
    body('id').exists().isString(),
    body('transactionId').exists().isString(),
    body('amount').exists().isNumeric()
  ];
  const transferRequestSchema = [
    body('fromAccountId').exists().isString(),
    body('toAccountId').exists().isString(),
    body('depositId').exists().isString(),
    body('withdrawalId').exists().isString(),
    body('amount').exists().isNumeric()
  ]

  const depositPostController = container.get('App.controllers.DepositPostController');
  const withdrawalPostController = container.get('App.controllers.WithdrawalPostController')
  const transferPostController = container.get('App.controllers.TransferPostController')

  router.post('/deposit', requestSchema, validateReqSchema, (req: Request, res: Response) =>
      depositPostController.run(req, res)
  );
  router.post('/withdrawal', requestSchema, validateReqSchema, (req: Request, res: Response) =>
      withdrawalPostController.run(req, res)
  );
  router.post('/transfer', transferRequestSchema, validateReqSchema, (req: Request, res: Response) =>
      transferPostController.run(req, res)
  );
};
