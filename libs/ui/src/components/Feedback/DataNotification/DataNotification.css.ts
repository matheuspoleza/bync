import { style } from '@bync/style';

import { border, colors } from '@/styles/theme';

import * as ToastTheme from './DataNotificationTheme.css';

export const SYSTEM_MESSAGE_HEIGHT = 36;

export const baseStyles = style({
  borderRadius: border.radius[12],
  width: 301,
  minHeight: 42,
  overflow: 'hidden',
});

export const headerStyles = style({
  height: 42,

  background: ToastTheme.contract.background,
  color: colors.white[100],

  borderRadius: `${border.radius[12]} ${border.radius[12]} 0 0`,
  paddingTop: 2,
  userSelect: 'none',
  position: 'relative',
  zIndex: 10,
});

export const titleStyles = style({
  whiteSpace: 'nowrap',
});

export const titleSecondaryStyles = style({
  color: ToastTheme.contract.color,
});

export const bodyStyles = style({
  backgroundColor: colors.shades.shades100,
  position: 'relative',
  zIndex: 1,
});

export const buttonStyles = style({
  marginTop: 12,
});

export const gaugeStyles = style({
  width: 48,
  selectors: {
    '&::before': {
      background: colors.white[20],
    },
  },
});
