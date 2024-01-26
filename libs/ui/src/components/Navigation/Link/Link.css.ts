import type { StyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { transition } from '@/styles/theme';

import * as LinkTheme from './LinkTheme.css';

const baseActive: StyleRule = {
  color: LinkTheme.vars.color.active,
  textDecorationColor: 'transparent',
};

const secondaryActive: StyleRule = {
  color: LinkTheme.vars.color.active,
};

const disabledLinkVariant = styleVariants({
  true: {
    cursor: 'not-allowed',
    textDecoration: 'none',
    opacity: '.65',
  },
  false: {
    cursor: 'pointer',
  },
});

const disabledLink = disabledLinkVariant.true;

const dottedUnderlineStates: Record<string, StyleRule> = {
  default: {
    content: '',
    backgroundImage: `linear-gradient(to right, ${LinkTheme.vars.color.dotted.default} 25%, rgba(255, 255, 255, 0) 0%)`,
    backgroundPosition: 'left',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '4px 1px',
    position: 'absolute',
    right: '0',
    bottom: '1px',
    left: '1px',
    height: '1px',
    opacity: 1,
    transition: transition(['opacity']),
  },
};

const dottedActive = {
  color: LinkTheme.vars.color.dotted.active,
  selectors: {
    '&::after': {
      opacity: 0,
    },
  },
};

export const baseLinkStyle = style({
  color: LinkTheme.vars.color.default,
  whiteSpace: 'nowrap',
  position: 'relative',
  transition: transition(['color', 'text-decoration', 'text-decoration-color', 'opacity']),
  textUnderlineOffset: '2px',
  textDecoration: 'underline',
  textDecorationThickness: '1px',
  textDecorationColor: 'transparent',
  height: 'fit-content',
  width: 'fit-content',
  display: 'block',
});

const linkeSizeVariants = styleVariants({
  medium: {
    fontSize: LinkTheme.vars.size.medium,
  },
  small: {
    fontSize: LinkTheme.vars.size.small,
  },
});

const linkStyleVariants = styleVariants({
  primary: {
    transition: transition(['color', 'text-decoration', 'text-decoration-color', 'opacity']),
    selectors: {
      [`&:not(${disabledLink}):hover:not(:active)`]: {
        textDecorationColor: LinkTheme.vars.color.hover,
        color: LinkTheme.vars.color.hover,
      },
      [`&:not(${disabledLink}):active`]: baseActive,
    },
  },
  secondary: {
    color: LinkTheme.vars.color.secondary.default,

    selectors: {
      [`&:not(${disabledLink}):hover:not(:active)`]: {
        color: LinkTheme.vars.color.secondary.hover,
        textDecorationColor: LinkTheme.vars.color.secondary.hover,
      },
      [`&:not(${disabledLink}):active`]: secondaryActive,
    },
  },
  dotted: {
    selectors: {
      '&::after': dottedUnderlineStates.default,
      [`&:not(${disabledLink}):hover:not(:active)`]: {
        textDecorationColor: 'transparent',
        color: LinkTheme.vars.color.dotted.hover,
      },
      [`&:not(${disabledLink}):hover:not(:active)::after`]: {
        backgroundImage: `linear-gradient(to right, ${LinkTheme.vars.color.dotted.underline.hover} 25%, rgba(255, 255, 255, 0) 0%)`,
      },
      [`&:not(${disabledLink}):active::after`]: {
        opacity: 0,
      },
      [`&:not(${disabledLink}):active`]: dottedActive,
    },
  },
});

export const linkRecipe = recipe({
  base: baseLinkStyle,
  variants: {
    size: linkeSizeVariants,
    variant: linkStyleVariants,
    overflow: {
      true: {
        overflow: 'hidden',
      },
    },
    isActive: {
      true: baseActive,
    },
    disabled: disabledLinkVariant,
  },
  compoundVariants: [
    {
      variants: { variant: 'dotted', isActive: true, disabled: false },
      style: dottedActive,
    },
    {
      variants: { variant: 'secondary', isActive: true, disabled: false },
      style: secondaryActive,
    },
  ],
});

export const textOverrideStyles = style({
  fontSize: 'inherit',
});

export const inline = style({
  display: 'inline-block',
});
