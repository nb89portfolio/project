'use client';

import { CacheKey } from './types';

export default function getCache<T, R>(key: CacheKey, base: R): T | R {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);

    if (item !== null) {
      return JSON.parse(item);
    }
  }
  return base;
}
