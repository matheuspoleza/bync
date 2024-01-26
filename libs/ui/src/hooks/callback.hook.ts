// eslint-disable-next-line lodash/import-scope
import type { DebounceSettings } from 'lodash';
import _debounce from 'lodash/debounce';
import { useMemo } from 'react';

import { useTeardown } from './lifecycle.hook';

export const useDebouncedCallback = <C extends (...args: any[]) => any>(
  delay: number,
  callback: C,
  // eslint-disable-next-line default-param-last
  deps: any[] = [],
  options?: DebounceSettings
) => {
  const memo = useMemo(() => _debounce(callback, delay, options), deps);

  useTeardown(() => {
    memo.cancel();
  });

  return memo;
};
