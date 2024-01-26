import { useLayoutEffect, useRef } from 'react';

export const useIsFirstRender = () => {
  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
    }
  });

  return { isFirstRender: firstUpdate.current };
};
