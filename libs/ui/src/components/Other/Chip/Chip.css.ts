import { style } from '@bync/style';

import { colors, shadows } from '@/styles/theme';

export const chipStyles = style({
  display: 'inline-flex',
  cursor: 'text',
  height: '28px',
  borderRadius: '6px',
  backgroundColor: colors.neutralLight.neutralsLight50,
  boxShadow: shadows.chipShadow.default,
});

export const closeButtonStyles = style({
  background: 'transparent',
  selectors: {
    [`&:enabled`]: {
      color: colors.neutralLight.neutralsLight800,
    },
    [`&:enabled:hover`]: {
      backgroundColor: 'transparent',
      color: colors.neutralDark.neutralsDark200,
    },
    [`&:enabled:active`]: {
      backgroundColor: 'transparent',
      color: colors.neutralDark.neutralsDark300,
    },
  },
});
