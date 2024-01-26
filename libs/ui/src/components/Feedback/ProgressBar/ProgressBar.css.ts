import { style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

export const trackStyles = style({
  height: 2,
  borderRadius: border.radius[2],
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: colors.fern.fern900_8,
  selectors: {
    '&::before': {
      content: '',
      display: 'block',
      position: 'absolute',
      inset: 0,
      zIndex: 1,
      backgroundColor: colors.neutralDark.neutralsDark900_6,
    },
  },
});

export const barStyles = style({
  transition: transition(['width']),
  position: 'relative',
  zIndex: 2,

  height: 2,
  borderRadius: border.radius[2],
  backgroundColor: colors.accent.accent500,
});
