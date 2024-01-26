import { recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { colors, transition } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

const disabledStyle = {
  border: inputTokens.borders.disabled.border,
  cursor: 'not-allowed',
  color: inputTokens.colors.text.default.disabled,
};

const defaultVariantSelectors = {
  '&:focus': {
    border: inputTokens.borders.active.border,
    boxShadow: inputTokens.shadows.focus,
    outline: 'none',
  },
  '&:focus-visible': {
    boxShadow: inputTokens.shadows.focus,
  },
  '&::placeholder': {
    color: inputTokens.colors.text.default.placeholder,
  },
  '&:disabled': disabledStyle,
  '&:hover:enabled:not(:focus)': {
    border: inputTokens.borders.hover.border,
  },
};

export const chunkStyles = {
  ...disabledStyle,
  color: inputTokens.colors.text.chunk.default,
  selectors: {
    '&:hover': {
      color: inputTokens.colors.text.chunk.hover,
    },
  },
};

export const sharedTextAreaBorderStyles = {
  border: inputTokens.borders.default.border,
  borderRadius: inputTokens.borders.default.radius,
  color: inputTokens.colors.text.default.text,
  transition: inputTokens.animations.transition,
  selectors: {
    '&:focus-visible': {
      boxShadow: inputTokens.shadows.focus,
      outline: 'none',
    },
    '&:focus': {
      border: inputTokens.borders.active.border,
      boxShadow: inputTokens.shadows.focus,
      outline: 'none',
    },
    '&::placeholder': {
      color: inputTokens.colors.text.default.placeholder,
    },
    '&:disabled': {
      border: inputTokens.borders.disabled.border,
      cursor: 'not-allowed',
      color: inputTokens.colors.text.default.disabled,
    },
    '&:hover:enabled:not(:focus)': {
      border: inputTokens.borders.hover.border,
    },
  },
};

export const textAreaBaseStyle = style({
  padding: '8px 15px 6px',
  display: 'block',
  width: '100%',
  marginBottom: 0,
  backgroundClip: 'padding-box',
  backgroundColor: 'white',
  backgroundImage: 'none',
  resize: 'none',
  boxSizing: 'border-box',
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.default,
  lineHeight: Theme.vars.font.lineHeight.basic,
  fontWeight: Theme.vars.font.weight.regular,
  outline: 'none',
  scrollbarWidth: 'none',
  '::-webkit-scrollbar': {
    display: 'none',
  },
  ...sharedTextAreaBorderStyles,
});

export const inputErrorVariantStyle = {
  border: inputTokens.borders.error.border,
  selectors: {
    '&:hover:enabled:not(:focus)': {
      border: inputTokens.borders.error.border,
    },
  },
};

export const textAreaStyleRecipe = recipe({
  base: textAreaBaseStyle,
  variants: {
    variant: {
      default: {
        selectors: defaultVariantSelectors,
      },
      chunk: chunkStyles,
    },
    error: {
      true: inputErrorVariantStyle,
    },
    ellipsis: {
      true: {
        selectors: {
          '&:not(:focus)': {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis',
          },
        },
      },
    },
    horizontalScroll: {
      true: {
        whiteSpace: 'nowrap',
        overflowX: 'scroll',
        border: 'none',
        padding: '0px',
        selectors: {
          '&:disabled': {
            border: 'none',
          },
        },
      },
    },
  },
});

export const iconStyles = style({
  position: 'absolute',
  height: '24px',
  width: '24px',
  cursor: 'pointer',
  color: inputTokens.colors.icon.default.default,
  right: '5px',
  top: '5px',
  transition: transition(['color']),
  selectors: {
    '&:hover': {
      color: inputTokens.colors.icon.default.hover,
    },
    '&:active': {
      color: inputTokens.colors.icon.default.active,
    },
  },
});

export const container = recipe({
  base: {
    position: 'relative',
    display: 'block',
    width: '100%',
    height: '100%',
  },

  variants: {
    ellipsis: {
      true: {
        selectors: {
          '&:not(:focus-within):after': {
            content: '""',
            position: 'absolute',
            bottom: 1,
            left: 10,
            right: 10,
            height: 8,
            background: '#fff',
            pointerEvents: 'none',
          },
        },
      },
    },
  },
});

export const captionRecipe = recipe({
  base: {
    marginTop: 6,
  },
  variants: {
    default: {
      true: { color: colors.neutralDark.neutralsDark50 },
    },
    error: {
      true: {
        color: colors.alert.alert700,
      },
    },
  },
});
