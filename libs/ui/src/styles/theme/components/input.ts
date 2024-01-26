import { transition } from '../helpers';
import { colors as colorTokens } from '../tokens';
import { radius } from '../tokens/border';

export const animations = {
  transition: transition(['background-color', 'color', 'border', 'box-shadow']),
};

export const colors = {
  text: {
    default: {
      text: colorTokens.neutralDark.neutralsDark900,
      placeholder: colorTokens.neutralDark.neutralsDark50,
      disabled: colorTokens.neutralDark.neutralsDark50,
    },
    dark: {
      text: colorTokens.neutralLight.neutralsLight50,
      placeholder: colorTokens.neutralDark.neutralsDark50,
    },
    chunk: {
      hover: colorTokens.neutralDark.neutralsDark600,
      default: colorTokens.neutralDark.neutralsDark50,
    },
  },
  icon: {
    default: {
      default: colorTokens.neutralDark.neutralsDark100,
      focus: colorTokens.accent.accent500,
      error: colorTokens.alert.alert700,
      hover: colorTokens.neutralDark.neutralsDark600,
      active: colorTokens.accent.accent500,
      disabled: colorTokens.neutralLight.neutralsLight600,
    },
    ghost: {
      active: colorTokens.neutralDark.neutralsDark200,
      hover: colorTokens.neutralDark.neutralsDark600,
      default: colorTokens.neutralDark.neutralsDark100,
    },
    dark: {
      default: colorTokens.neutralDark.neutralsDark100,
      active: colorTokens.neutralDark.neutralsDark200,
    },
    darkClickable: {
      hover: colorTokens.accent.accent200,
      active: colorTokens.accent.accent300,
    },
  },
  label: {
    default: colorTokens.neutralDark.neutralsDark100,
    caption: colorTokens.neutralDark.neutralsDark50,
    error: colorTokens.alert.alert700,
  },
  focusIndicator: {
    default: colorTokens.accent.accent500,
    error: colorTokens.alert.alert700,
  },
};

export const borders = {
  default: {
    border: `1px solid ${colorTokens.neutralLight.neutralsLight100}`,
    radius: radius[8],
  },
  hover: {
    border: `1px solid ${colorTokens.neutralLight.neutralsLight200}`,
  },
  active: {
    border: `1px solid ${colorTokens.accent.accent500}`,
  },
  disabled: {
    border: `1px solid ${colorTokens.neutralLight.neutralsLight50}`,
  },
  error: {
    border: `1px solid ${colorTokens.alert.alert600}`,
  },
  noBorder: {
    default: '1px solid transparent',
  },
};

export const shadows = {
  focus: `0px 0px 0px 1px ${colorTokens.accent.accent500}`,
};

export const opacity = {
  disabled: 0.65,
};
