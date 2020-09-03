import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import express, {
  RequestHandler, Application, Request, Response,
} from 'express';
import { Helmet } from 'react-helmet';
import { resolve } from 'path';
import { Template } from '../Template';
import { cspNonceMiddleware } from './middleware/cspNonceMiddleware';
import { encodeData } from '../encoder';

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
  const dataKeys = Object.keys(data);
  // @ts-expect-error
  const promises = dataKeys.map((key) => data[key]);
  return Promise.all(promises).then((res) => res.reduce((prev, curr, i) => {
    // eslint-disable-next-line no-param-reassign
    prev[dataKeys[i]] = curr;
    return prev;
  }, {} as any));
};

function renderPage<T>(cmpnt: React.ReactElement, data?: WithPromisesResolved<T>) {
  return (_req: Request, res: Response) => {
    const markup = renderToStaticMarkup(cmpnt);
    const helmetData = Helmet.renderStatic();
    if (data !== undefined) {
      const html = renderToStaticMarkup(<Template markup={markup} helmet={helmetData} prerenderedData={encodeData(data)} />);
      return res.status(200).send(html);
    }
    const html = renderToStaticMarkup(<Template markup={markup} helmet={helmetData} />);
    return res.status(200).send(html);
  };
}

function render<T extends object>(data: T) {
  return (getComponent: (data: WithPromisesResolved<T>) => React.ReactElement) => (req: Request, res: Response) => {
    resolveData(data).then((resolvedData) => {
      const cmpnt = getComponent(resolvedData);
      const handler = renderPage(cmpnt, resolvedData);
      handler(req, res);
    }).catch((err) => {
      throw new Error(err);
    });
  };
}

export const prerendered = (app: Application) => {
  console.info('Starting Prerendered');
  const staticPath = resolve(process.cwd(), '.prerendered', 'static');
  console.info('Mapping /static path to folder %s', staticPath);
  app.use('/static', express.static(staticPath));
  return {
    middleware: middlewareHandler,
    render,
  };
};
