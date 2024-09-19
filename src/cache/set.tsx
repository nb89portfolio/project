'use client';

import { getCurrentHours } from './time';
import { ClientCacheKeys, ClientCacheData } from './types';

export default function setClientCache<DataType>(
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
