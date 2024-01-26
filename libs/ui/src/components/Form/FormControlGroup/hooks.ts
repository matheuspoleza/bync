import { useMemo } from 'react';

import type { IFormControlGroupOption } from './types';

export const useOptionMap = <T>(options: IFormControlGroupOption<T>[]) =>
  useMemo(
    () =>
      options.reduce(
        (acc, option) => Object.assign(acc, { [option.id]: option }),
        {} as Record<string, IFormControlGroupOption<T>>
      ),
    [options]
  );
