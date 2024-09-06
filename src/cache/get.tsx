'use client';

import { CacheKey, CacheLimiter } from './types';

export default function getCache<T, R>(key: CacheKey, base: R): T | R {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);

    if (item !== null) {
      const limitKey = 'limit: ' + key;
      const limit = localStorage.getItem(limitKey);

      if (limit !== null) {
        const limiter: CacheLimiter = JSON.parse(limit);

        const newTime = new Date().getTime() / 3600;

        const difference = limiter.date - newTime;

        const evaluation = difference < limiter.limit;

        if (evaluation) {
          return JSON.parse(item);
        } else {
          localStorage.setItem(key, '');
          localStorage.setItem(limitKey, '');

          return base;
        }
      }
    }
  }
  return base;
}
