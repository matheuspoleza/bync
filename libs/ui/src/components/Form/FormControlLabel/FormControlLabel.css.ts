import { style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';
import { colors, typography } from '@/styles/theme';

export const containerStyles = styleVariants(
  {
    enabled: false,
    disabled: true,
  },
  (disabled) => [
    {
      display: 'inline-block',
      fontFamily: Theme.vars.font.family.default,
      cursor: 'pointer',
    },
    disabled
      ? {
          cursor: 'not-allowed',
        }
      : {},
  ]
);

export const labelStyles = style({
  display: 'flex',
});

export const labelTextStyles = style({
  color: colors.neutralDark.neutralsDark900,
  marginLeft: '12px',
  cursor: 'inherit',
  userSelect: 'none',

  selectors: {
    [`${containerStyles.disabled} &`]: {
      color: colors.neutralDark.neutralsDark50,
    },
  },
});

export const captionStyles = style({
  fontSize: '12px',
  marginLeft: '28px',
  display: 'inline-block',
  lineHeight: typography.lineHeight[17],
  color: colors.neutralDark.neutralsDark100,
  userSelect: 'none',

  selectors: {
    [`${containerStyles.disabled} &`]: {
      color: colors.neutralLight.neutralsLight600,
    },
  },
});
