import { keyframes, recipe, style, styleVariants } from '@bync/style';

import { animation, transition } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

import { inputBaseStyles } from '../../styles/Input.css';
import * as SearchInputTheme from './SearchInputTheme.css';

const inputBase = {
  ...inputBaseStyles,
  padding: '9px 0px 7px 0px',
  width: '300px',
  paddingLeft: '31px',
  border: SearchInputTheme.contract.border.default,
  color: SearchInputTheme.contract.color.default,
  backgroundColor: 'transparent',
  transition: transition(['border-color', 'box-shadow', 'background-color']),
  selectors: {
    '&::placeholder': {
      color: SearchInputTheme.contract.color.placeholder,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: inputTokens.colors.text.default.disabled,
    },
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
};

export const inputVariantStyles = styleVariants({
  light: {},
  dark: {},
});

export const inputBaseStyle = style(inputBase);

export const inputStyleRecipe = recipe({
  base: inputBaseStyle,
  variants: {
    variant: inputVariantStyles,
  },
});

export const inputContainer = style({
  position: 'relative',
});

const fadeIn = keyframes({
  '0%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
  },
});

export const iconFadeIn = style({
  animationName: fadeIn,
  animationDuration: animation.duration.default,
  opacity: 1,
  animationFillMode: 'forwards',
  animationTimingFunction: animation.timingFunction.default,
});

export const iconFadeOut = style([
  iconFadeIn,
  {
    animationDirection: 'reverse',
  },
]);

export const iconStyleRecipe = recipe({
  base: {
    height: '24px',
    width: '24px',
    color: SearchInputTheme.contract.icon.color.default,
    position: 'absolute',
    zIndex: 20,
    cursor: 'pointer',
    top: '6.25px',
    transition: inputTokens.animations.transition,
    userSelect: 'none',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  variants: {
    clickable: {
      true: {
        cursor: 'pointer',
        transition: transition(['color']),
        selectors: {
          '&:hover': {
            color: SearchInputTheme.contract.icon.color.hover,
          },
          '&:active': {
            color: SearchInputTheme.contract.icon.color.active,
          },
        },
      },
      false: {
        cursor: 'default',
      },
    },
  },
});

export const staticIconStyles = style({ opacity: 1 });
