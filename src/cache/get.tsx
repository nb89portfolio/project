'use client';

import getCurrentHours from './hours';
import { ClientCacheKeys, ClientCacheData } from './types';

function getClientCache<DataType>(
  key: ClientCacheKeys,
  username: string,
  currentData: DataType
): DataType {
  const localStorageData = localStorage.getItem(key);

  const isValidData = localStorageData !== null;

  if (!isValidData) {
    return currentData;
  }

  const parsedData: ClientCacheData<DataType> = JSON.parse(
    localStorageData as string
  );

  const isValidUser = username === parsedData.username;

  if (isValidUser) {
    return currentData;
  }

  const { hourlyLimit, initialHours } = parsedData.ttl;

  const currentHours = getCurrentHours();

  const hourlyDifferential = currentHours - initialHours;

  const isValidTtl = hourlyDifferential <= hourlyLimit;

  if (!isValidTtl) {
    return currentData;
  }

  return parsedData.data as DataType;
}

export default getClientCache;
