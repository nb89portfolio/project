'use client';

import { Dispatch, SetStateAction } from 'react';
import { getCurrentHours } from './hours';
import { ClientCacheKeys, ClientCacheData } from './types';

function getLocalStorage(key: ClientCacheKeys) {
  const data = localStorage.getItem(key);
  const isValid = data !== null;
  return { data, isValid };
}

function getData(cache: string, username: string) {
  const data: ClientCacheData = JSON.parse(cache);

  const isValid = username === data.user;

  return { data, isValid };
}

function validateData(uploadedHours: number, hourLimt: number) {
  const currentHours = getCurrentHours();

  const differaceInHours = currentHours - uploadedHours;

  const isValid = differaceInHours < hourLimt;

  return isValid;
}

function processClientCache<DataType>(
  key: ClientCacheKeys,
  username: string,
  defaultData: DataType
): DataType {
  const cache = getLocalStorage(key);

  if (!cache.isValid) {
    return defaultData;
  }

  const payload = getData(cache.data as string, username);

  if (!payload.isValid) {
    return defaultData;
  }

  const { time } = payload.data;

  const isValid = validateData(time.current, time.limit);

  if (isValid) {
    return payload.data as DataType;
  }

  return defaultData as DataType;
}

export default function getClientCache<DataType>(
  key: ClientCacheKeys,
  username: string,
  defaultData: DataType,
  setState: Dispatch<SetStateAction<DataType>>
) {
  const data = processClientCache<DataType>(key, username, defaultData);

  setState(data);
}
