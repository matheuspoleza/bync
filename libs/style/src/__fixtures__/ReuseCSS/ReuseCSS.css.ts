import { style } from '@/main';

import { Button } from '../Button';

export const base = style([
  Button.css.base,
  {
    backgroundColor: 'red',
    borderRadius: 0,
  },
]);
