import { RequestHandler, Request, Response } from 'express';
import { randomBytes } from 'crypto';

type MiddlewareConfig = Record<'nonce', boolean>

const cspNonceMiddleware = (_req: Request, res: Response) => {
  res.locals.cspNonce = randomBytes(16).toString('hex');
};

const middlewareHandler: (config: MiddlewareConfig) => RequestHandler = (config) => (req, res, next) => {
  if (config.nonce) {
    cspNonceMiddleware(req, res);
  }
  next();
};

const prerendered = () => ({
  middleware: middlewareHandler,
  fetch: () => {},
});

export default prerendered;
