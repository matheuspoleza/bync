import { useRef } from 'react';

import type { Nullish } from '@/types';

export const usePersistFunction = <T extends (...args: any[]) => any>(fn: Nullish<T>): T => {
  const cache = useRef<{ fn: Nullish<T>; persistedFn: T | null }>({ fn, persistedFn: null });

  cache.current.fn = fn;

  if (cache.current.persistedFn === null) {
    cache.current.persistedFn = ((...args: Parameters<T>) => cache.current.fn?.(...args)) as T;
  }

  return cache.current.persistedFn;
};
