import { style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

export const trackStyles = style({
  height: '4px',
  borderRadius: border.radius[2],
  backgroundColor: colors.neutralDark.neutralsDark900_12,
});

export const barStyles = style({
  transition: transition(['width']),
  transitionDuration: '2s',
  position: 'relative',
  zIndex: 2,
  height: '4px',
  borderRadius: border.radius[2],
  backgroundColor: colors.neutralDark.neutralsDark600,
});
