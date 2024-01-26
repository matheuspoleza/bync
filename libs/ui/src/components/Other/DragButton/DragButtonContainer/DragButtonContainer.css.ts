import type { StyleRule } from '@bync/style';
import { recipe, style } from '@bync/style';

import { transition } from '@/styles/theme';

export const dragButtonContainer = style({
  position: 'relative',
  width: '100%',
});

const visiblePlacementStyle: StyleRule = {
  opacity: 1,
};

export const dragButtonPlacement = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    opacity: 0,
    transition: transition(['opacity']),

    selectors: {
      [`${dragButtonContainer}:hover &`]: visiblePlacementStyle,
      [`${dragButtonContainer}:active &`]: visiblePlacementStyle,
    },
  },

  variants: {
    isVisible: {
      true: visiblePlacementStyle,
    },

    disabled: {
      true: {
        opacity: 0,
        pointerEvents: 'none',

        selectors: {
          [`${dragButtonContainer}:hover &`]: { opacity: 0 },
          [`${dragButtonContainer}:active &`]: { opacity: 0 },
        },
      },
    },

    variant: {
      section: {
        top: 5,
        left: 6,
      },

      inline: {
        top: -2,
        left: 6,
        zIndex: 1,
      },
    },
  },
});
