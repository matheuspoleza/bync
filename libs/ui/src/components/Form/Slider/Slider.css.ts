import type { ComplexStyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { border, colors } from '@/styles/theme';
import { shadesGlows } from '@/styles/theme/tokens/shadows';

export const sliderContainerStyles = style({
  height: '8px',
});

export const markStylesObject: ComplexStyleRule = {
  width: '8px',
  height: '8px',
  display: 'inline-block',
  borderRadius: border.radius.round,
  border: `2px solid ${colors.white[100]}`,
  cursor: 'pointer',
  top: '2px',
  selectors: {
    '&:last-of-type': { transform: 'translateX(-50%)' },
  },
};

export const markStyles = style(markStylesObject);

const markVariants = styleVariants({
  basic: { backgroundColor: colors.neutralLight.neutralsLight200 },
  marked: {
    backgroundColor: colors.accent.accent500,
  },
});

export const markRecipe = recipe({
  base: markStylesObject,
  variants: {
    variant: markVariants,
  },
});

const thumbAfter: ComplexStyleRule = {
  content: ' ',
  display: 'block',
  position: 'absolute',
  backgroundColor: colors.white[100],
  borderRadius: border.radius.round,
  width: '10px',
  height: '10px',
  top: '50%',
  left: '50%',
  boxShadow: shadesGlows['0100Outer'][12],
  transform: 'translate(-50%, -50%)',
  willChange: 'width, height',
};

const thumbBefore: ComplexStyleRule = {
  content: ' ',
  display: 'block',
  position: 'absolute',
  width: '14px',
  height: '14px',
  outline: 'none',
  borderRadius: border.radius.round,
  backgroundColor: colors.accent.accent500,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  willChange: 'width, height',
};

export const thumbStyles = style({
  zIndex: 2,
  cursor: 'grab',
  width: '1px',
  height: '1px',
  outline: 'none',
  position: 'absolute',
  borderRadius: border.radius.round,
  top: '6px',
  left: 0,
  transform: 'translateY(-1px)',
  transformOrigin: 'center',
  willChange: 'transform, left',

  selectors: {
    '&:hover': {
      cursor: 'grab',
    },
    '&:active': { cursor: 'grabbing' },
    '&::before': thumbBefore,
    '&::after': thumbAfter,
    '&:hover::after, &:active::after': {
      width: '12px',
      height: '12px',
    },
    '&:hover::before, &:active::before': {
      width: '16px',
      height: '16px',
    },
  },
});

export const thumbActiveStyles = style({
  selectors: {
    '&:focus-visible, &:focus': { boxShadow: 'none', border: 0 },
  },
});

export const rangeStyles = style({
  backgroundColor: colors.neutralLight.neutralsLight200,
  height: '2px',
  top: '5px',
  cursor: 'pointer',

  selectors: {
    '&:nth-of-type(1)': {
      backgroundColor: colors.accent.accent500,
    },
  },
});

export const labelStyles = style({ color: colors.neutralDark.neutralsDark100 });
