import { recipe, style, styleVariants } from '@bync/style';

import { border, transition } from '@/styles/theme';
import { button } from '@/styles/theme/components';
import { spacing } from '@/styles/theme/tokens/spacing';

import * as SquareButtonTheme from './SquareButtonTheme.css';

const xLargeSize = '40px';
const largeSize = '36px';
const mediumSize = '32px';
const smallSize = '24px';

const hoveringStyles = {
  backgroundColor: SquareButtonTheme.contract.backgroundColor.hover,
  color: SquareButtonTheme.contract.color.hover,
};

const activeStyles = {
  backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
  color: SquareButtonTheme.contract.color.active,
};

const baseSquareButtonStyles = style({
  border: '0',
  transition: transition(button.animations.properties),
  cursor: 'pointer',
  background: 'transparent',
  color: SquareButtonTheme.contract.color.default,

  selectors: {
    '&:enabled:hover:not(:active)': hoveringStyles,

    '&:enabled:active:hover': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
      color: SquareButtonTheme.contract.color.active,
    },

    '&:enabled:active': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
      color: SquareButtonTheme.contract.color.active,
    },
    '&:disabled': {
      backgroundColor: SquareButtonTheme.contract.backgroundColor.disabled,
      color: SquareButtonTheme.contract.color.disabled,
      cursor: 'not-allowed',
    },
  },
});

export const squareButtonSizeVariants = styleVariants({
  xlarge: {
    height: xLargeSize,
    width: xLargeSize,
    borderRadius: border.radius[10],
    padding: spacing[8],
  },
  large: {
    height: largeSize,
    width: largeSize,
    borderRadius: border.radius[8],
    padding: spacing[6],
  },
  medium: {
    height: mediumSize,
    width: mediumSize,
    borderRadius: border.radius[7],
    padding: spacing[4],
  },
  small: {
    height: smallSize,
    width: smallSize,
    borderRadius: border.radius[6],
    padding: '0',
  },
});

export const squareButtonStyles = recipe({
  base: baseSquareButtonStyles,
  variants: {
    size: squareButtonSizeVariants,
    isHovering: {
      true: {
        selectors: {
          '&:enabled': hoveringStyles,
        },
      },
    },
    isActive: {
      true: {
        selectors: {
          '&:enabled': activeStyles,
          '&:enabled:hover': activeStyles,
          '&:enabled:hover:not(:active)': {
            backgroundColor: SquareButtonTheme.contract.backgroundColor.active,
            color: SquareButtonTheme.contract.color.active,
          },
        },
      },
    },
  },
});

export const loadingSpinnerStyles = style({
  height: '24px',
  width: '24px',
});
