import { recipe, style, styleVariants } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

import * as InputTheme from './InputTheme.css';

export const inputBaseStyles = {
  display: 'block',
  flex: 1,
  padding: '8px 15px 6px',
  border: InputTheme.contract.border.default,
  color: InputTheme.contract.color.default,
  marginBottom: 0,
  backgroundClip: 'padding-box',
  backgroundColor: InputTheme.contract.backgroundColor,
  backgroundImage: 'none',
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.default,
  lineHeight: Theme.vars.font.lineHeight.basic,
  fontWeight: Theme.vars.font.weight.regular,
  outline: 'none',
  borderRadius: InputTheme.contract.border.radius,
  transition: inputTokens.animations.transition,
  selectors: {
    '&::placeholder': {
      color: InputTheme.contract.color.placeholder,
    },
    '&:disabled': {
      cursor: 'not-allowed',
      color: inputTokens.colors.text.default.disabled,
    },
    '&:focus-visible': {
      boxShadow: 'none',
    },
  },
};

export const inputVariantStyles = styleVariants({
  primary: {
    selectors: {
      '&:disabled': {
        border: inputTokens.borders.disabled.border,
      },
      '&:focus': {
        border: inputTokens.borders.active.border,
      },
    },
  },
  ghost: {
    selectors: {
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
    },
  },
  dark: {
    selectors: {
      '&:focus': {
        boxShadow: 'none',
        outline: 'none',
      },
    },
  },
});

const errorVariantStyle = style({});

export const inputBaseStyle = style(inputBaseStyles);

export const inputStyleRecipe = recipe({
  base: inputBaseStyle,
  variants: {
    error: {
      true: errorVariantStyle,
    },
    variant: inputVariantStyles,
    prefixIcon: {
      true: {
        paddingLeft: '43px',
      },
    },
    suffixIcon: {
      true: {
        paddingRight: '43px',
      },
    },
    ellipsis: {
      true: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'primary',
        error: false,
      },
      style: {
        selectors: {
          '&:hover:enabled:not(:focus)': {
            border: inputTokens.borders.hover.border,
          },
          '&:focus': {
            boxShadow: inputTokens.shadows.focus,
            outline: 'none',
          },
        },
      },
    },
    {
      variants: {
        variant: 'primary',
        error: true,
      },
      style: {
        border: inputTokens.borders.error.border,
        selectors: {
          '&:focus': {
            boxShadow: inputTokens.shadows.focus,
          },
        },
      },
    },
    {
      variants: {
        variant: 'ghost',
        prefixIcon: false,
      },
      style: {
        padding: '9px 0px 7px 0px',
        borderRadius: 0,
      },
    },
    {
      variants: {
        variant: 'ghost',
        prefixIcon: true,
      },
      style: {
        borderRadius: 0,
      },
    },
    {
      variants: {
        variant: 'ghost',
        prefixIcon: false,
      },
      style: {
        padding: '9px 0px 7px 0px',
        borderRadius: 0,
      },
    },
  ],
});

export const inputContainer = style({
  position: 'relative',
});

export const iconStyleRecipe = recipe({
  base: {
    height: '24px',
    width: '24px',
    color: InputTheme.contract.icon.color.default,
    position: 'absolute',
    zIndex: 2,
    top: '6.25px',
    transition: inputTokens.animations.transition,
    userSelect: 'none',
    selectors: {
      [`${inputBaseStyle}:disabled ~ &`]: {
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    alignment: {
      left: {
        left: '12px',
        selectors: {
          [`${inputVariantStyles.primary} ${errorVariantStyle}:enabled ~ &`]: {
            color: inputTokens.colors.icon.default.error,
          },
          [`${inputVariantStyles.primary}:enabled:focus ~ &`]: {
            color: inputTokens.colors.icon.default.active,
          },
          [`${errorVariantStyle}:enabled ~ &`]: {
            color: inputTokens.colors.icon.default.error,
          },
        },
      },
      right: {
        right: '8px',
        selectors: {
          [`${inputVariantStyles.primary}:enabled ~ &:hover`]: {
            color: colors.neutralDark.neutralsDark600,
          },
          [`${inputVariantStyles.primary}:enabled ~ &:active`]: {
            color: colors.accent.accent500,
          },
        },
      },
    },
    isSmall: {
      true: {
        top: 0,
        right: '4px',
      },
    },
    clickable: {
      true: {
        cursor: 'pointer',
        selectors: {
          '&:enabled:active': {
            color: InputTheme.contract.icon.color.active,
          },
        },
      },
      false: {
        pointerEvents: 'none',
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        alignment: 'left',
        clickable: false,
      },
      style: {
        selectors: {
          [`${inputBaseStyle}:focus ~ &`]: {
            color: InputTheme.contract.icon.color.focus,
          },
          [`${errorVariantStyle} ~ &`]: {
            color: inputTokens.colors.icon.default.error,
          },
        },
      },
    },
  ],
});
