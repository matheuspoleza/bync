import { recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { colors, transition } from '@/styles/theme';

export const containerStyle = style({
  width: '100%',
});

export const firstLineStyle = style({
  fontSize: Theme.vars.font.size.default,
  padding: '0px',
  border: 'none',
  width: '100%',
  selectors: {
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
});

export const secondLineStyleRecipe = recipe({
  base: {
    fontSize: Theme.vars.font.size.caption,
    color: colors.neutralDark.neutralsDark300,
    lineHeight: Theme.vars.font.lineHeight.caption,
    padding: '0px',
    border: 'none',
    width: '100%',
    selectors: {
      '&:focus-visible': {
        boxShadow: 'none',
      },
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
    },
  },
  variants: {
    error: {
      true: {
        color: colors.alert.alert700,
      },
    },
  },
});

export const secondLineWrapper = recipe({
  base: {
    transition: transition(['opacity', 'height']),
    opacity: 1,
  },
  variants: {
    show: {
      true: {
        opacity: 1,
        height: 'auto',
      },
      false: {
        opacity: 0,
        height: 0,
      },
    },
  },
});
