/* eslint-disable no-underscore-dangle */
import { encode } from 'cbor';

export const encodeData = (data: any) => encode(data).toString('hex');
