'use client';

import { CacheKey, CacheLimiter } from './types';

export default function setCache<T>(
  key: CacheKey,
  value: T,
  hourlyLifeTime: number
): void {
  const secondsInHours = 3600;

  const date = new Date();
  const time = date.getTime();
  const hours = time / secondsInHours;

  const timeLimiter: CacheLimiter = {
    limit: hourlyLifeTime,
    date: hours,
  };

  const limitKey = 'limit: ' + key;

  localStorage.setItem(limitKey, JSON.stringify(timeLimiter));
  localStorage.setItem(key, JSON.stringify(value));
}
