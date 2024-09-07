'use client';

import { ClientCache, ClientCacheKey } from './types';

export default function setClientCache<Data>(
  key: ClientCacheKey,
  user: string,
  data: Data,
  limit: number
): void {
  try {
    const secondsInHours = 3600;

    const current = new Date().getTime() / secondsInHours;

    const time = { limit, current };

    const payload: ClientCache = { user, data, time };

    const string = JSON.stringify(payload);

    localStorage.setItem(key, string);
  } catch (error) {
    throw error;
  }
}
