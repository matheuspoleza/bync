import { style } from '@bync/style';

import { border, colors, shadows, transition } from '@/styles/theme';
import { button } from '@/styles/theme/components';

const size = '56px';

export const circleButtonStyles = style({
  background: colors.accent.accent500,
  border: '0',
  height: size,
  borderRadius: border.radius[100],
  width: size,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: transition(button.animations.properties),
  color: colors.white[100],
  boxShadow: shadows.buttonShadows.primary.default,
  cursor: 'pointer',
  selectors: {
    '&:enabled:hover:not(:active)': {
      background: colors.accent.accent600,
      boxShadow: shadows.buttonShadows.primary.hover,
      color: colors.neutralDark.neutralsDark600,
    },
    '&:enabled:active': {
      background: colors.accent.accent700,
      boxShadow: shadows.buttonShadows.primary.active,
      color: colors.neutralDark.neutralsDark800,
    },
    '&:disabled': {
      background: colors.accent.accent300,
      boxShadow: shadows.buttonShadows.primary.disabled,
      cursor: 'not-allowed',
    },
  },
});

export const loadingSpinnerStyles = style({
  color: colors.white[100],
  height: '24px',
  width: '24px',
});

export const iconStyles = style({
  stroke: '#00000014', // If another incidence of this appears, consider adding it to the tokens
  strokeWidth: '2px',
  color: colors.accent.accent50,
  strokeLinejoin: 'round',

  // selector for circleButtonStyles in disabled date
  selectors: {
    [`${circleButtonStyles}:disabled &`]: {
      color: colors.white[100],
    },
  },
});
