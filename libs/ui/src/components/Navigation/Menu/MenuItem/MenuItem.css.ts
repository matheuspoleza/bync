import { recipe, style } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

export const baseContainerStyle = style({
  position: 'relative',
  padding: '11px 20px 7px 20px',
  width: '100%',
  cursor: 'pointer',
  borderRadius: border.radius[5],
  color: colors.neutralDark.neutralsDark900,
  zIndex: 1,
  display: 'flex',
  selectors: {
    '&::before': {
      transition: transition(['background-color']),
      position: 'absolute',
      zIndex: '-1',
      top: '0',
      right: '4px',
      bottom: '0',
      left: '4px',
      borderRadius: border.radius[5],
      content: ' ',
    },
  },
});

export const disabledState = style({
  cursor: 'not-allowed',
});

export const enabledState = style({
  selectors: {
    '&:hover::before': {
      backgroundColor: colors.neutralLight.neutralsLight50,
    },

    '&:active::before': {
      backgroundColor: `${colors.neutralLight.neutralsLight100} !important`,
    },
  },
});

export const containerStyle = recipe({
  base: baseContainerStyle,
  variants: {
    disabled: {
      true: disabledState,
    },

    isHovering: {
      true: {
        '::before': {
          backgroundColor: colors.neutralLight.neutralsLight50,
        },
      },
    },
  },

  compoundVariants: [
    {
      variants: { disabled: false, isHovering: undefined },
      style: enabledState,
    },
  ],
});

export const leftSectionStyles = style({
  lineHeight: 0,
  width: '100%',
  overflow: 'hidden',
});

export const checkboxContainer = style({
  marginRight: '12px',
});

export const textContent = style({
  width: '100%',
  overflow: 'hidden',
});

export const labelStyles = style({
  lineHeight: '18px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  wordBreak: 'break-all',
  selectors: {
    [`${disabledState} &`]: {
      color: colors.neutralDark.neutralsDark50,
    },
  },
});

export const captionStyles = style({
  color: colors.neutralDark.neutralsDark100,
  marginTop: '4px',
  selectors: {
    [`${disabledState} &`]: {
      color: colors.neutralLight.neutralsLight600,
    },
  },
});

export const hotKeyStyles = style({
  color: colors.neutralDark.neutralsDark100,
});

const baseIconStyles = {
  selectors: {
    [`${disabledState} &`]: {
      color: colors.neutralLight.neutralsLight600,
    },
    [`${enabledState}:hover &`]: {
      color: colors.neutralDark.neutralsDark300,
    },
    [`${enabledState}:active &`]: {
      color: colors.neutralDark.neutralsDark600,
    },
  },
};

export const prefixIconStyles = style({
  ...baseIconStyles,
  flexShrink: 0,
  color: colors.neutralDark.neutralsDark100,
  marginRight: '12px',
});

export const suffixIconStyles = style({
  ...baseIconStyles,
  color: colors.neutralDark.neutralsDark100,
  marginTop: '-3px',
  marginRight: '-5px',
});

export const prefixIconRecipe = recipe({
  base: prefixIconStyles,
  variants: {
    disabled: {
      true: {
        opacity: 0.65,
      },
    },
  },
});
