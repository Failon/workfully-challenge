import { Router, Request, Response } from 'express';
import container from '../dependency-injection';
import { body } from 'express-validator';
import { validateReqSchema } from '.';

export const register = (router: Router) => {
  const reqSchema = [
    body('id').exists().isString(),
    body('transactionId').exists().isString(),
    body('amount').exists().isNumeric()
  ];

  const depositPostController = container.get('App.controllers.DepositPostController');
  const withdrawalPostController = container.get('App.controllers.WithdrawalPostController')
  const transferPostController = container.get('App.controllers.TransferPostController')
  router.post('/deposit/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
      depositPostController.run(req, res)
  );
  router.post('/withdrawal/:id', reqSchema, validateReqSchema, (req: Request, res: Response) =>
      withdrawalPostController.run(req, res)
  );
  router.post('/transfer/:fromId/:toId', reqSchema, validateReqSchema, (req: Request, res: Response) =>
      transferPostController.run(req, res)
  );
};
