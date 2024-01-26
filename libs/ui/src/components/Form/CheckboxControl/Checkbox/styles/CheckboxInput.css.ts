import { style } from '@bync/style';

export const inputStyles = style({
  opacity: 0,
  position: 'absolute',
  width: 'inherit',
  height: 'inherit',
  margin: 0,
  cursor: 'pointer',

  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
    },
  },
});
