'use client';

import getCurrentHours from './hours';
import { ClientCacheKeys, ClientCacheData } from './types';

function getLocalStorageData(key: string) {
  const data = localStorage.getItem(key);

  const isValid = data === null;

  return { data, isValid };
}

function getParsedData<DataType>(localStorageData: string, username: string) {
  const data: ClientCacheData<DataType> = JSON.parse(localStorageData);

  const isValid = username === data.username;

  return { data, isValid };
}

function getValidatedData<DataType>(parsedData: ClientCacheData<DataType>) {
  const data = parsedData.data;

  const currentHours = getCurrentHours();

  const hourlyDifferential = currentHours - parsedData.ttl.initialHours;

  const isValid = hourlyDifferential <= parsedData.ttl.hourlyLimit;

  return { data, isValid };
}

function getClientCache<DataType>(
  key: ClientCacheKeys,
  username: string,
  currentData: DataType
): DataType {
  const localStorageData = getLocalStorageData(key);

  if (!localStorageData.isValid) {
    return currentData;
  }

  const parsedData = getParsedData<DataType>(
    localStorageData.data as string,
    username
  );

  if (!parsedData.isValid) {
    return currentData;
  }

  const validatedData = getValidatedData(parsedData.data);

  if (!validatedData.isValid) {
    return currentData;
  }

  return validatedData.data;
}

export default getClientCache;
