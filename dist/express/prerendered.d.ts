import React from 'react';
import { RequestHandler, Request, Response } from 'express';
declare type MiddlewareKeys = 'nonce';
export declare type MiddlewareConfig = Partial<Record<MiddlewareKeys, boolean>>;
declare type PromiseValue<T> = T extends Promise<infer U> ? U : T;
declare type WithPromisesResolved<T> = {
    [K in keyof T]: PromiseValue<T[K]>;
};
declare function render<T extends object>(data: T): (getComponent: (data: WithPromisesResolved<T>) => React.ReactElement) => (req: Request, res: Response) => void;
export declare const prerendered: () => {
    middleware: (config: MiddlewareConfig) => RequestHandler;
    render: typeof render;
};
export {};
//# sourceMappingURL=prerendered.d.ts.map