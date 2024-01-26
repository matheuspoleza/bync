import type { StyleRule } from '@bync/style';
import { createVar, recipe, styleVariants } from '@bync/style';

import { animation, colors, createTransition, shadows } from '@/styles/theme';

export const colorVar = createVar();

const fastTransition = createTransition({
  duration: animation.duration.fast,
  timingFunction: animation.timingFunction.easeOut,
});

const disabledStyles = {
  true: {
    opacity: 0.65,
    cursor: 'not-allowed',
  },
  false: { cursor: 'pointer' },
};

export const previewBorderSizeVariants = styleVariants({
  small: {
    width: '20px',
    height: '20px',

    selectors: {
      '&::after': {
        width: '20px',
        height: '20px',
      },
      '&::before': {
        width: '16px',
        height: '16px',
      },
    },
  },
  large: {
    width: '32px',
    height: '32px',

    selectors: {
      '&::after': {
        width: '32px',
        height: '32px',
      },

      '&::before': {
        width: '28px',
        height: '28px',
      },
    },
  },
});

export const previewVariants = styleVariants({
  hibiscus: {
    vars: {
      [colorVar]: colors.hibiscus.hibiscus500,
    },
  },
  fern: {
    vars: {
      [colorVar]: colors.fern.fern500,
    },
  },
  havelock: {
    vars: {
      [colorVar]: colors.havelock.havelock500,
    },
  },
  default: {
    vars: {
      [colorVar]: colors.neutralDark.neutralsDark200,
    },
  },
  copper: {
    vars: {
      [colorVar]: colors.copper.copper500,
    },
  },
  wheel: {
    vars: {
      [colorVar]: colors.colorPreview.radial,
    },
  },
});

export const previewBorderRecipe = recipe({
  base: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: '50%',
    zIndex: 0,
    transition: fastTransition(['border']),

    selectors: {
      '&::after, &::before': {
        content: '""',
        position: 'absolute',
        borderRadius: '50%',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        transition: fastTransition(['background', 'opacity']),
      },
      '&::before': {
        zIndex: 0,
        background: colors.white[50],
      },
      '&::after': {
        zIndex: -1,
        background: colorVar,
        opacity: 0.3,
      },
    },
  },
  variants: {
    isDisabled: disabledStyles,
    size: previewBorderSizeVariants,
    variant: previewVariants,
    isActive: {
      true: {
        border: `2px solid ${colors.accent.accent500}`,
        selectors: {
          '&::before, &::after': {
            opacity: 0,
          },
        },
      },
      false: {
        border: '0px solid rgba(0,0,0,0)',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'wheel',
      },
      style: {
        selectors: {
          '&::after': {
            background: colors.neutralDark.neutralsDark50,
          },
        },
      },
    },
  ],
});

export const previewSizeVariants = styleVariants({
  small: {
    width: '12px',
    height: '12px',
    boxShadow: shadows.colorPreviewShadow.small,
  },
  large: {
    width: '20px',
    height: '20px',
    boxShadow: shadows.colorPreviewShadow.large,
  },
});

const base: StyleRule = {
  borderRadius: '50%',
  position: 'absolute',
  background: colorVar,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1,
};

export const previewRecipe = recipe({
  base,
  variants: {
    size: previewSizeVariants,
    variant: previewVariants,
    isDisabled: disabledStyles,
  },
});
