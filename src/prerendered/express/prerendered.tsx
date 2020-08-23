import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import express, { Application, Request, Response } from 'express';
import { Helmet } from 'react-helmet';
import { resolve } from 'path';
import { Template } from '../Template';
import { cspNonceMiddleware } from './middleware/cspNonceMiddleware';

type MiddlewareKeys = 'nonce'
export type MiddlewareConfig = Partial<Record<MiddlewareKeys, boolean>>

const middlewareHandler: (app: Application) => (config: MiddlewareConfig) => void = (app) => (config) => {
  if (config.nonce) {
    app.use(cspNonceMiddleware);
  }
  app.use('/static', express.static(resolve(process.cwd(), '.prerendered', 'static')));
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
      const cmpnt = getComponent(resolved);
      const handler = renderPage(cmpnt);
      handler(req, res);
    }).catch((err) => {
      throw new Error(err);
    });
  };
}

export const prerendered = (app: Application) => ({
  middleware: middlewareHandler(app),
  render,
});
