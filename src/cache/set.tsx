'use client';

import { CacheKey } from './types';

export default function setCache<T>(key: CacheKey, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
