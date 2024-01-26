import { recipe, style, styleVariants } from '@bync/style';

import { Tokens } from '@/styles';
import { transition } from '@/styles/theme';

export const navigationItemContainer = style({
  padding: '10px 12px',
  gap: '4px',
  color: Tokens.colors.neutralLight.neutralsLight600,
});

export const labelStyles = style({
  flex: 3,
  marginTop: 3,
});

export const captionStyles = style({
  marginTop: 3,
});

export const iconStyles = style({
  opacity: 0.8,
});

export const buttonVariants = styleVariants({
  default: {
    color: Tokens.colors.neutralLight.neutralsLight600,
    selectors: {
      '&:hover': {
        color: Tokens.colors.neutralLight.neutralsLight300,
      },
      '&:active': {
        color: Tokens.colors.neutralLight.neutralsLight50,
      },
    },
  },
  new: {
    color: Tokens.colors.accent.accent200,
    selectors: {
      '&:hover': {
        color: Tokens.colors.accent.accent100,
      },
      '&:active': {
        color: Tokens.colors.accent.accent50,
      },
    },
  },
  alert: {
    color: Tokens.colors.alert.alert200,
    selectors: {
      '&:hover': {
        color: Tokens.colors.alert.alert100,
      },
      '&:active': {
        color: Tokens.colors.alert.alert50,
      },
    },
  },
});

export const navigationItemTextRecipe = recipe({
  base: {
    cursor: 'pointer',
    padding: '6px 12px 6px 8px',
    gap: '8px',
    borderRadius: '6px',
    transition: transition(['background', 'color']),
    selectors: {
      '&:hover': {
        background: Tokens.colors.neutralDark.neutralsDark400,
      },
      '&:active': {
        background: Tokens.colors.neutralDark.neutralsDark300,
      },
    },
  },
  variants: {
    isActive: {
      true: {
        background: `${Tokens.colors.neutralDark.neutralsDark300} !important`,
      },
    },
    variant: buttonVariants,
  },
  compoundVariants: [
    {
      variants: {
        variant: 'default',
        isActive: true,
      },
      style: {
        color: `${Tokens.colors.neutralLight.neutralsLight50} !important`,
      },
    },
    {
      variants: {
        isActive: true,
        variant: 'new',
      },
      style: {
        color: `${Tokens.colors.accent.accent50} !important`,
      },
    },
    {
      variants: {
        isActive: true,
        variant: 'alert',
      },
      style: {
        color: `${Tokens.colors.alert.alert50} !important`,
      },
    },
  ],
});
