import { recipe, styleVariants } from '@bync/style';

import { Tokens } from '../../../../../styles';

export const pathwFillVariants = styleVariants({
  basic: {
    fill: Tokens.colors.neutralDark.neutralsDark500,
  },
  alert: {
    fill: Tokens.colors.alert.alert700,
  },
  success: {
    fill: Tokens.colors.success.success600,
  },
});

export const arrowOrientation = styleVariants({
  left: { transform: 'rotate(180deg)', top: '-4px' },
  top: {
    transform: 'rotate(270deg)',
    bottom: '-6px',
  },
  bottom: { transform: 'rotate(90deg)', top: '-6px' },
  right: { transform: 'rotate(0deg)', left: '-3px', top: '-4px' },
});

export const arrowRecipe = recipe({
  base: {
    position: 'absolute',
  },
  variants: {
    orientation: arrowOrientation,
  },
});

export const pathRecipe = recipe({
  variants: {
    variant: pathwFillVariants,
  },
});
