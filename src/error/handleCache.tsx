'use client';

import { Dispatch, SetStateAction } from 'react';
import { ErrorReport } from './types';
import getClientCache from '../cache/get';

export default function handleErrorCache(
  username: string,
  setRecords: Dispatch<SetStateAction<ErrorReport[]>>
) {
  const data = getClientCache<ErrorReport[], []>('error', username, []);

  setRecords(data);
}
