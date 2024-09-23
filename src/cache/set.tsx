'use client';

import { ClientCacheKeys, ClientCacheData } from './types';
import getCurrentHours from './hours';

function setClientCache<DataType>(
  key: ClientCacheKeys,
  username: string,
  data: DataType,
  hourlyLimit: number
) {
  const initialHours = getCurrentHours();

  const ttl = { hourlyLimit, initialHours };

  const payload: ClientCacheData<DataType> = { username, data, ttl };

  const string = JSON.stringify(payload);

  localStorage.setItem(key, string);
}

export default setClientCache;
