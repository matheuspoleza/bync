import type { DecoratorFunction } from '@storybook/types';
import _over from 'lodash/over';
import { useState } from 'react';

export const WithFormControlState: DecoratorFunction<any> = (Story, { args }) => {
  const [value, setValue] = useState(args.value);

  return (
    <Story
      args={{
        ...args,
        value,
        onValueChange: setValue,
      }}
    />
  );
};
