'use client';

import { getCurrentHours } from './time';
import { ClientCacheKeys, ClientCacheData } from './types';

export default function getClientCache<DataType>(
  key: ClientCacheKeys,
  user: string,
  defaultData: DataType
): DataType {
  const cache = localStorage.getItem(key);

  const isCacheNull = cache === null;

  if (isCacheNull) {
    return defaultData;
  }

  const payload: ClientCacheData = JSON.parse(cache);

  const isUserValid = user === payload.user;

  if (!isUserValid) {
    return defaultData;
  }

  const updatedHours = getCurrentHours();

  const differaceInHours = updatedHours - payload.time.current;

  const isValidDifference = differaceInHours < payload.time.limit;

  if (isValidDifference) {
    return payload.data as DataType;
  }

  return defaultData;
}
