/* eslint-disable no-underscore-dangle */
import { decode } from 'cbor';

declare global {
    interface Window {
      __PRERENDERED__: any
    }
}

export const getPrerenderedData = <T extends object>(): T => {
  if (typeof window !== 'undefined' && window.__PRERENDERED__ !== undefined) {
    const input = window.__PRERENDERED__;
    delete window.__PRERENDERED__;
    return decode(Buffer.from(input, 'hex'));
  }
  throw new Error('Error: window is undefined or prerendered data not found');
};
