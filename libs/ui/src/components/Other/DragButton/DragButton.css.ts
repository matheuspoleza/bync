import type { StyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { animation, border, colors, createTransition } from '@/styles/theme';

const fastTransition = createTransition({
  duration: animation.duration.default,
  timingFunction: animation.timingFunction.default,
});

const hoverButtonStyles: StyleRule = {
  backgroundColor: colors.neutralDark.neutralsDark900_6,
};

const activeButtonStyles: StyleRule = {
  backgroundColor: colors.neutralDark.neutralsDark900_12,
};

const baseButtonStyles = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: border.radius[6],
  cursor: 'grab',
  border: 0,
  width: '12px',
  height: '24px',
  outline: 'none',
  position: 'relative',
  backgroundColor: colors.white[100],
  transition: fastTransition(['background-color']),

  selectors: {
    '&:enabled:hover': hoverButtonStyles,
    '&:enabled:active': activeButtonStyles,
  },
});

const hoverStyleVariants = styleVariants({
  true: {
    selectors: {
      '&:enabled': hoverButtonStyles,
    },
  },
});

const activeStyleVariants = styleVariants({
  true: {
    cursor: 'grabbing',

    selectors: {
      '&:enabled:hover': activeButtonStyles,
      '&:enabled': activeButtonStyles,
    },
  },
});

export const dragButtonStyles = recipe({
  base: baseButtonStyles,

  variants: {
    isHovering: hoverStyleVariants,
    isActive: activeStyleVariants,
  },
});

const hoverIconStyles: StyleRule = {
  fill: colors.neutralDark.neutralsDark600,
};

const activeIconStyles: StyleRule = {
  fill: colors.neutralDark.neutralsDark800,
};

export const iconStyles = style({
  position: 'absolute',
  transformOrigin: 'center',
  height: '24px',
  width: '24px',
  pointerEvents: 'none',
  fill: colors.neutralDark.neutralsDark100,
  transition: fastTransition(['fill']),

  selectors: {
    [`${baseButtonStyles}:enabled:hover &`]: hoverIconStyles,
    [`${hoverStyleVariants.true}:enabled &`]: hoverIconStyles,
    [`${baseButtonStyles}:enabled:active &`]: activeIconStyles,
    [`${activeStyleVariants.true}:enabled &`]: activeIconStyles,
  },
});
