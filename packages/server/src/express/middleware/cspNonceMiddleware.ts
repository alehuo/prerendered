import { Request, Response } from 'express';
import { randomBytes } from 'crypto';

export const cspNonceMiddleware = (_req: Request, res: Response) => {
  res.locals.cspNonce = randomBytes(16).toString('hex');
};
