'use client';

import { ClientCache, ClientCacheKey } from './types';

export default function getClientCache<Data, Revert>(
  key: ClientCacheKey,
  user: string,
  revert: Revert
): Data | Revert {
  try {
    const secondsInHours = 3600;

    const cache = localStorage.getItem(key);

    const isCacheNull = cache === null;

    if (isCacheNull) {
      return revert;
    }

    const payload: ClientCache = JSON.parse(cache);

    const isUserValid = user === payload.user;

    if (!isUserValid) {
      return revert;
    }

    const updated = new Date().getTime() / secondsInHours;

    const differace = updated - payload.time.current;

    const isValid = differace < payload.time.limit;

    if (isValid) {
      return payload.data as Data;
    }

    return revert;
  } catch (error) {
    throw error;
  }
}
