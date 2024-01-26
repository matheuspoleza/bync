import type { StyleRule } from '@bync/style';
import { recipe, style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';
import { border, colors } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';
import { buttonShadows } from '@/styles/theme/tokens/shadows';

import * as DropdownTheme from './DropdownTheme.css';

export const inputContainer = recipe({
  base: {
    position: 'relative',
  },
  variants: {
    fullWidth: {
      false: {
        width: 'fit-content',
      },
      true: {
        width: '100%',
      },
    },
  },
});

const inputBase: StyleRule = {
  display: 'block',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '100%',
  whiteSpace: 'nowrap',
  textAlign: 'left',
  padding: '8px 30px 6px 0',
  border: DropdownTheme.contract.border.default,
  cursor: 'pointer',
  marginBottom: 0,
  backgroundColor: DropdownTheme.contract.backgroundColor,
  fontFamily: Theme.vars.font.family.default,
  backgroundImage: 'none',
  lineHeight: Theme.vars.font.lineHeight.basic,
  borderRadius: border.radius[8],
  color: DropdownTheme.contract.color.default,
  transition: inputTokens.animations.transition,
  selectors: {
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: inputTokens.shadows.focus,
      outline: 'none',
    },
  },
};

export const dropdownVariantStyles = styleVariants({
  primary: {
    fontSize: Theme.vars.font.size.default,
    selectors: {
      '&:focus': {
        border: inputTokens.borders.active.border,
      },
      '&:enabled:hover:not(:focus)': {
        border: inputTokens.borders.hover.border,
      },
    },
  },
  dark: {
    width: 'fit-content',
    selectors: {
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
      '&:disabled': {
        color: colors.neutralLight.neutralsLight900,
      },
    },
  },
});

export const dropdownBaseStyle = style(inputBase);

const disabledStyles = styleVariants({
  true: {
    color: inputTokens.colors.text.default.disabled,
    border: inputTokens.borders.disabled.border,
    cursor: 'not-allowed',
  },
});

const sizeVariants = styleVariants({
  true: {
    height: '24px',
    paddingTop: '1.5px',
    paddingBottom: '3px',
    paddingRight: '24px',
    paddingLeft: '8px',
    borderRadius: border.radius[6],
  },
  false: {
    paddingRight: '32px',
  },
});

const borderVariants = styleVariants({
  true: {},
  false: {
    border: '1px solid transparent',
    selectors: {
      '&:focus': {
        color: colors.accent.accent500,
        border: '1px solid transparent',
        boxShadow: 'none',
      },
    },
  },
});

const fontSizeVariants = styleVariants({
  basic: {
    fontSize: Theme.vars.font.size.default,
  },
  caption: {
    fontSize: Theme.vars.font.size.caption,
  },
});

// Used to style the icon states
export const dropdownErrorVariants = styleVariants({
  true: {},
});

export const inputStyleRecipe = recipe({
  base: dropdownBaseStyle,
  variants: {
    error: dropdownErrorVariants,
    variant: dropdownVariantStyles,
    prefixIcon: {
      true: {
        paddingLeft: '43px',
      },
      false: {
        paddingLeft: '16px',
      },
    },
    fontSize: fontSizeVariants,
    weight: {
      regular: {
        fontWeight: Theme.vars.font.weight.regular,
      },
      semiBold: {
        fontWeight: Theme.vars.font.weight.bold,
      },
    },
    isDisabled: disabledStyles,
    isEmpty: {
      true: {
        color: DropdownTheme.contract.color.placeholder,
      },
    },
    isSmall: sizeVariants,
    fullWidth: {
      false: {},
      true: {
        width: '100%',
      },
    },
    bordered: borderVariants,
    isOpen: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'primary',
        isOpen: true,
      },
      style: {
        border: inputTokens.borders.active.border,
        boxShadow: inputTokens.shadows.focus,
        selectors: {
          '&:enabled:hover:not(:focus)': {
            border: inputTokens.borders.active.border,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        error: true,
        isOpen: false,
        isSmall: false,
      },
      style: {
        fontSize: Theme.vars.font.size.default,
        border: inputTokens.borders.error.border,
        selectors: {
          '&:enabled:hover:not(:focus)': {
            border: inputTokens.borders.error.border,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        error: true,
        isOpen: false,
      },
      style: {
        fontSize: Theme.vars.font.size.default,
        border: inputTokens.borders.error.border,
        selectors: {
          '&:enabled:hover:not(:focus)': {
            border: inputTokens.borders.error.border,
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: false,
        isSmall: true,
        isOpen: true,
      },
      style: {
        color: colors.accent.accent600,
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: false,
        isSmall: true,
      },
      style: {
        paddingLeft: '8px',
        selectors: {
          '&:focus': {
            color: colors.accent.accent600,
          },
          '&:enabled:not(:focus):hover': {
            color: colors.accent.accent500,
            border: '1px solid transparent',
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: false,
        isSmall: true,
        isOpen: true,
      },
      style: {
        color: colors.accent.accent600,
        border: '1px solid transparent',
        boxShadow: 'none',
      },
    },
    {
      variants: {
        variant: 'primary',
        bordered: true,
        isSmall: true,
      },
      style: {
        width: 'fit-content',
        fontSize: Theme.vars.font.size.caption,
        paddingLeft: '8px',
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: false,
      },
      style: {
        color: colors.neutralLight.neutralsLight50,
        paddingLeft: '8px',
        selectors: {
          '&:enabled:not(:focus):hover': {
            border: '1px solid transparent',
            boxShadow: 'none',
            color: colors.accent.accent200,
          },
          '&:focus': {
            border: '1px solid transparent',
            boxShadow: 'none',
            color: colors.accent.accent300,
          },
        },
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: false,
        isOpen: true,
      },
      style: {
        border: '1px solid transparent',
        boxShadow: 'none',
        color: colors.accent.accent300,
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: true,
      },
      style: {
        color: colors.neutralLight.neutralsLight200,
        border: `1px solid ${colors.neutralDark.neutralsDark300}`,
        paddingLeft: '8px',
        selectors: {
          '&:enabled:not(:focus):hover': {
            border: `1px solid none`,
            backgroundColor: colors.neutralDark.neutralsDark300,
            boxShadow: buttonShadows.secondaryDark.default,
            color: colors.neutralLight.neutralsLight100,
          },
          '&:focus': {
            boxShadow: 'none',
            backgroundColor: colors.neutralDark.neutralsDark200,
            color: colors.neutralLight.neutralsLight50,
            border: '1px solid transparent',
          },
          '&:disabled': {
            border: `1px solid ${colors.neutralDark.neutralsDark500}`,
          },
        },
      },
    },
    {
      variants: {
        variant: 'dark',
        bordered: true,
        isOpen: true,
      },
      style: {
        boxShadow: 'none',
        backgroundColor: colors.neutralDark.neutralsDark200,
        color: colors.neutralLight.neutralsLight50,
        border: '1px solid transparent',
      },
    },
  ],
});
