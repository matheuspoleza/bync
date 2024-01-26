import type { ComplexStyleRule } from '@bync/style';
import { recipe, style } from '@bync/style';

import { Tokens } from '@/styles';
import { transition } from '@/styles/theme';

export const activeStyle: ComplexStyleRule = {
  color: Tokens.colors.neutralLight.neutralsLight50,
  background: Tokens.colors.neutralDark.neutralsDark600,
  boxShadow: 'inset -1px 0px 0px rgba(25, 29, 34, 0.32)',
};

export const hoverStyle: ComplexStyleRule = {
  color: Tokens.colors.neutralLight.neutralsLight600,
  background: Tokens.colors.neutralDark.neutralsDark700,
  boxShadow: 'inset -1px 0px 0px rgba(25, 29, 34, 0.32)',
};

export const baseStyle = style({
  cursor: 'pointer',
  height: '56px',
  width: '56px',
  padding: 'none',
  borderRadius: '0',
  color: Tokens.colors.neutralLight.neutralsLight900,
  background: 'transparent',
  transition: transition(['background', 'color', 'box-shadow']),

  selectors: {
    '&:active': {
      ...activeStyle,
    },
  },
});

export const menuItemStyle = recipe({
  base: baseStyle,

  variants: {
    isActive: {
      true: activeStyle,

      false: {
        ':hover': hoverStyle,
        ':active': activeStyle,
      },
    },
  },
});
