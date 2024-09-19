'use client';

import { Dispatch, SetStateAction } from 'react';
import { getCurrentHours } from './hours';
import { ClientCacheKeys, ClientCacheData } from './types';

function processClientCache<DataType>(
  key: ClientCacheKeys,
  user: string,
  data: DataType,
  limit: number
): void {
  const current = getCurrentHours();

  const time = { limit, current };

  const payload: ClientCacheData = { user, data, time };

  const string = JSON.stringify(payload);

  localStorage.setItem(key, string);
}

export default function setClientCache<DataType>(
  key: ClientCacheKeys,
  user: string,
  data: DataType,
  limit: number,
  setState: Dispatch<SetStateAction<DataType>>
) {
  processClientCache<DataType>(key, user, data, limit);

  setState(data);
}
