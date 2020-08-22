import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { RequestHandler, Request, Response } from 'express';
import { Helmet } from 'react-helmet';
import { Template } from '../Template';
import { cspNonceMiddleware } from './middleware/cspNonceMiddleware';

type MiddlewareKeys = 'nonce'
export type MiddlewareConfig = Partial<Record<MiddlewareKeys, boolean>>

const middlewareHandler: (config: MiddlewareConfig) => RequestHandler = (config) => (req, res, next) => {
  if (config.nonce) {
    cspNonceMiddleware(req, res);
  }
  next();
};

type PromiseValue<T> = T extends Promise<infer U> ? U : T
type WithPromisesResolved<T> = { [K in keyof T]: PromiseValue<T[K]> }

const resolveData = async <T extends object>(data: T): Promise<WithPromisesResolved<T>> => {
  const resolved: any = {};
  Object.keys(data).forEach(async (key) => {
    // @ts-expect-error
    if (data[key] instanceof Promise) {
      // @ts-expect-error
      const res = await data[key];
      resolved[key] = res;
    }
    // @ts-expect-error
    resolved[key] = data[key];
  }, {});
  return Promise.resolve(resolved);
};

function renderPage(cmpnt: React.ReactElement) {
  return (_req: Request, res: Response) => {
    const markup = renderToStaticMarkup(cmpnt);
    const helmetData = Helmet.renderStatic();
    const html = renderToStaticMarkup(<Template markup={markup} helmet={helmetData} />);
    return res.status(200).send(html);
  };
}

function render<T extends object>(data: T) {
  return (getComponent: (data: WithPromisesResolved<T>) => React.ReactElement) => (req: Request, res: Response) => {
    resolveData(data).then((resolved) => {
      renderPage(getComponent(resolved))(req, res);
    }).catch((err: unknown) => {
      if (typeof err === 'string') {
        res.status(500).send(err);
      } else {
        res.sendStatus(500);
      }
    });
  };
}

export const prerendered = () => ({
  middleware: middlewareHandler,
  render,
});
