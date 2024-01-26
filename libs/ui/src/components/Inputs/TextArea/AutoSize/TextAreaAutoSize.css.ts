import { recipe } from '@bync/style';

import { inputTokens } from '@/styles/theme/components';

import { inputErrorVariantStyle, sharedTextAreaBorderStyles } from '../TextArea.css';

const noBorderStyles = {
  borderTop: 'none',
  borderBottom: 'none',
  borderRight: 'solid 15px transparent',
  borderLeft: 'solid 15px transparent',
  boxShadow: 'none',
  outline: 'none',
  borderRadius: inputTokens.borders.default.radius,
};

const noBorderScrollStyles = {
  ...noBorderStyles,
};

export const textAreaAutoSizeModifiers = recipe({
  base: {
    minHeight: '50px',
    overflow: 'hidden',
    padding: '8px 15px 6px',
  },
  variants: {
    error: {
      true: {},
    },
    horizontalScroll: {
      true: {
        paddingRight: '0',
        paddingLeft: '0',
        overflowX: 'scroll',
        ...noBorderScrollStyles,
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        selectors: {
          '&:focus-visible': {
            ...noBorderStyles,
          },
          '&:focus': {
            ...noBorderStyles,
          },
          '&:hover:enabled:not(:focus)': {
            ...noBorderStyles,
          },
          '&::placeholder': {
            color: 'none',
          },
          '&:disabled': {
            ...noBorderStyles,
            cursor: 'not-allowed',
            color: inputTokens.colors.text.default.disabled,
            whiteSpace: 'pre',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        horizontalScroll: true,
        error: true,
      },
      style: {
        overflowX: 'scroll',
        scrollbarWidth: 'none',
        '::-webkit-scrollbar': {
          display: 'none',
        },
        ...noBorderScrollStyles,
        selectors: {
          '&:focus-visible': {
            ...noBorderStyles,
          },
          '&:focus': {
            ...noBorderStyles,
          },
          '&:hover:enabled:not(:focus)': {
            ...noBorderStyles,
            whiteSpace: 'pre',
          },
          '&:hover': {
            ...noBorderStyles,
            whiteSpace: 'pre',
          },
        },
      },
    },
  ],
});

export const textAreaContainerRecipe = recipe({
  base: {},
  variants: {
    horizontalScroll: {
      true: {
        padding: '0 0',
        ...sharedTextAreaBorderStyles,
        selectors: {
          '&:focus-within': {
            border: inputTokens.borders.active.border,
            boxShadow: inputTokens.shadows.focus,
            outline: 'none',
          },
          '&:hover:not(:focus-within)': {
            border: inputTokens.borders.hover.border,
          },
        },
      },
    },
    error: {
      true: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        horizontalScroll: true,
        error: true,
      },
      style: {
        borderRadius: inputTokens.borders.default.radius,
        color: inputTokens.colors.text.default.text,
        ...inputErrorVariantStyle,
        selectors: {
          '&:hover:not(:focus-within)': {
            border: inputTokens.borders.error.border,
          },
        },
      },
    },
  ],
});
