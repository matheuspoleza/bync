import type { RefObject } from 'react';
import { useCallback, useEffect, useRef } from 'react';

export enum LifecyclePhase {
  MOUNTING = 'mounting',
  MOUNTED = 'mounted',
  UNMOUNTING = 'unmounting',
}

export const useLifecycle = (): RefObject<LifecyclePhase> => {
  const phase = useRef(LifecyclePhase.MOUNTING);

  useEffect(() => {
    phase.current = LifecyclePhase.MOUNTED;

    return () => {
      phase.current = LifecyclePhase.UNMOUNTING;
    };
  }, []);

  return phase;
};

export const useTeardown = (callback: () => void, dependencies: unknown[] = []): void => {
  const phase = useLifecycle();
  const memoizedCallback = useCallback(callback, dependencies);

  useEffect(
    () => () => {
      // this must be determined inside of the useEffect()
      const isUnmounting = phase.current === LifecyclePhase.UNMOUNTING;

      if (isUnmounting) {
        memoizedCallback();
      }
    },
    [memoizedCallback]
  );
};
