import { style } from '@bync/style';

import * as SquareButtonTheme from '@/components/Buttons/SquareButton/styles/SquareButtonTheme.css';

export const buttonStyle = style({
  selectors: {
    '&:enabled:hover': {
      background: 'transparent',
      color: SquareButtonTheme.contract.color.default,
    },
    '&:enabled:active': {
      background: 'transparent',
      color: SquareButtonTheme.contract.color.default,
    },
  },
});
