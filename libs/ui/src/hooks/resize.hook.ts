import { useEffect, useRef } from 'react';

import { setRef } from '@/utils/ref.util';

import { useCreateConst } from './cache.hook';
import { usePersistFunction } from './usePersistFunction';

export const useResizeObserver = ({
  ref,
  disabled,
  onResize,
}: {
  ref: React.RefObject<HTMLElement>;
  disabled?: boolean;
  onResize: (entries: ResizeObserverEntry[]) => void;
}): void => {
  const onPersistedResize = usePersistFunction(onResize);
  const observer = useCreateConst(
    () => globalThis.ResizeObserver && new globalThis.ResizeObserver((entries) => onPersistedResize(entries))
  );

  useEffect(() => {
    if (disabled || !ref.current) return undefined;

    const node = ref.current;

    observer.observe(node, { box: 'border-box' });

    return () => {
      observer.unobserve(node);
    };
  }, [ref.current, disabled]);

  useEffect(() => () => observer.disconnect(), []);
};

export const useVirtualItemResizeObserver = <Element extends HTMLElement>(itemRef: React.Ref<Element>) => {
  const ref = useRef<Element>(null);

  const onRef = usePersistFunction((node: Element | null) => {
    setRef(ref, node);
    setRef(itemRef, node);
  });

  // this is the way to trigger height recalculation
  useResizeObserver({ ref, onResize: () => setRef(itemRef, ref.current) });

  return { ref, onRef };
};
