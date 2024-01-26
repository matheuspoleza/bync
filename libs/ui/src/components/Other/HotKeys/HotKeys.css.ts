import { recipe, style } from '@bync/style';

import { colors } from '@/styles/theme';

export const iconStyle = style({
  fontSize: '24px',
  marginTop: '-3.5px',
  height: '9px',
  width: '9px',
  marginRight: '4px',
});

export const labelStyles = style({
  lineHeight: '18px',
  marginLeft: '6px',
  marginRight: '-2px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all',
});

export const colorVariants = recipe({
  base: {
    color: colors.neutralDark.neutralsDark100,
  },
  variants: {
    variant: {
      light: {
        color: colors.neutralDark.neutralsDark100,
      },
      dark: {
        color: colors.neutralLight.neutralsLight500,
      },
      disabled: {
        color: colors.neutralLight.neutralsLight200,
      },
    },
  },
});
