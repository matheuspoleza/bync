import composeReactRefs from '@seznam/compose-react-refs';
import type { Ref } from 'react';

import type { Nullish } from '@/types';

export const setRef = <T>(ref: Nullish<Ref<T | null>>, value: T | null): void => {
  if (!ref) return;

  if (typeof ref === 'function') {
    ref(value);
  } else {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    ref.current = value;
  }
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const composeRefs: typeof composeReactRefs = composeReactRefs.default ?? composeReactRefs;
