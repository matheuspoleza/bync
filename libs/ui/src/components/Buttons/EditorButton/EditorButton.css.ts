import { recipe, style, styleVariants } from '@bync/style';

import { border, colors, transition } from '@/styles/theme';

export const editorButtonContainer = recipe({
  variants: {
    hasCaption: {
      true: {
        height: '58px',
      },
      false: {
        height: '36px',
      },
    },
    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: '250px',
      },
    },
  },
});

const hoverState = {
  backgroundColor: colors.neutralDark.neutralsDark900_6,
};

const hoverButtonStyles = styleVariants({
  true: hoverState,
  false: {
    backgroundColor: colors.white[100],
  },
});

const focusState = {
  backgroundColor: colors.accent.accent500,
  color: colors.white[100],
};

const focusButtonStyles = styleVariants({
  true: focusState,
});

const emptyStyles = styleVariants({
  true: {
    color: colors.neutralDark.neutralsDark100,
    selectors: {
      '&:not(:focus):hover:enabled': {
        color: colors.neutralDark.neutralsDark100,
      },
      '&:enabled:active': {
        color: colors.neutralDark.neutralsDark900,
      },
    },
  },
  false: {
    color: colors.neutralDark.neutralsDark900,
  },
});

const containerStyle = style({
  border: 'none',
  padding: '0px',
  paddingRight: '4px',
  paddingLeft: '4px',
  width: '100%',
  borderRadius: border.radius[7],
  transition: transition(['background-color']),
  cursor: 'pointer',

  selectors: {
    [`&:not(:focus):hover:not(${focusButtonStyles.true}):enabled`]: hoverState,
    [`&:not(${focusButtonStyles.true}):active:enabled`]: {
      backgroundColor: colors.neutralDark.neutralsDark900_12,
    },
    '&:disabled': {
      color: colors.neutralLight.neutralsLight600,
      cursor: 'not-allowed',
      backgroundColor: colors.white[100],
    },
  },
});

export const buttonStyle = recipe({
  base: containerStyle,
  variants: {
    isEmpty: emptyStyles,
    hasCaption: {
      true: {
        height: '58px',
      },
      false: {
        height: '32px',
      },
    },
    isActive: focusButtonStyles,
    isHovering: hoverButtonStyles,
  },
});

export const labelStyle = style({
  textAlign: 'left',
  maxWidth: '100%',
});

export const secondLabelStyle = style({
  minWidth: '0px',
  textAlign: 'left',
  marginTop: '2px',
});

export const arrowStyle = style({
  color: colors.neutralDark.neutralsDark50,
  flexShrink: 0,
  selectors: {
    [`${focusButtonStyles.true} &`]: {
      color: colors.accent.accent100,
    },
  },
});

export const iconContainer = recipe({
  base: {
    height: '32px',
    width: '32px',
    display: 'flex',
    marginRight: '2px',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  variants: {
    hasCaption: {
      true: {
        marginTop: '-6px',
      },
    },
    warning: {
      true: {
        marginRight: 0,
      },
    },
  },
});

export const iconStyles = recipe({
  base: {
    height: '100%',
    width: '100%',
    padding: '4px',

    color: colors.neutralDark.neutralsDark100,
    transition: transition(['color', 'background-color']),
    selectors: {
      [`${containerStyle}:hover:not(${focusButtonStyles.true}):enabled &`]: {
        color: colors.neutralDark.neutralsDark500,
      },
      [`${containerStyle}:not(:focus):active:enabled &`]: {
        color: colors.neutralDark.neutralsDark500,
      },
      [`${focusButtonStyles.true} &`]: {
        color: colors.accent.accent100,
      },
      [`${hoverButtonStyles.true} &`]: {
        color: colors.neutralDark.neutralsDark500,
      },
      [`${containerStyle}:disabled &`]: {
        color: colors.neutralLight.neutralsLight600,
      },
    },
  },
  variants: {
    isEmpty: {
      true: {
        selectors: {
          [`${containerStyle}:not(:focus):hover:enabled &`]: {
            color: colors.neutralDark.neutralsDark100,
          },
        },
      },
    },
    isWarning: {
      true: {
        color: colors.alert.alert500,
        selectors: {
          [`${containerStyle}:hover:not(${focusButtonStyles.true}):enabled &`]: {
            color: colors.neutralDark.neutralsDark500,
          },
        },
      },
    },
  },
});

export const iconButtonStyles = style({
  cursor: 'pointer',
  marginLeft: '4px',
  color: colors.neutralDark.neutralsDark100,
  transition: transition(['color', 'background-color']),
  selectors: {
    [`${containerStyle}:disabled &`]: {
      color: colors.neutralLight.neutralsLight600,
    },
    [`${containerStyle}:hover:not(${focusButtonStyles.true}):enabled &`]: {
      color: colors.neutralDark.neutralsDark500,
    },
    [`${containerStyle}:not(:focus):active &`]: {
      color: colors.neutralDark.neutralsDark500,
    },
    [`${focusButtonStyles.true} &`]: {
      color: colors.accent.accent100,
    },
    [`${hoverButtonStyles.true} &`]: {
      color: colors.neutralDark.neutralsDark500,
    },
  },
});

export const toggleButtonStyles = style({
  marginLeft: '8px',
  marginTop: '4px',
});

export const warningIcon = style({
  color: colors.alert.alert700,
  selectors: {
    [`${containerStyle}:not(${focusButtonStyles.true}):hover &`]: {
      color: colors.alert.alert700,
    },
    [`${focusButtonStyles.true} &`]: {
      color: colors.accent.accent100,
    },
  },
});

export const tooltipModifier = style({
  marginBottom: '-2px',
});

export const tooltipArrowStyles = style({
  right: '-2px',
});
