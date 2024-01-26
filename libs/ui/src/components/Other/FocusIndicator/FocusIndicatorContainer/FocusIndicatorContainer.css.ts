import { recipe, style } from '@bync/style';

import { transition } from '@/styles/theme';

export const focusIndicatorContainer = style({
  position: 'relative',
  width: '100%',
});

export const focusIndicatorPlacement = recipe({
  base: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    opacity: 0,
    transition: transition(['opacity']),

    selectors: {
      [`${focusIndicatorContainer}:focus-within &`]: {
        opacity: 1,
      },
    },
  },

  variants: {
    isVisible: {
      true: {
        opacity: 1,
      },
    },
  },
});
