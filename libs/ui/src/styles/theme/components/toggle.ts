import { animation, colors } from '../tokens';

export const color = {
  light: {
    background: {
      default: colors.neutralLight.neutralsLight100,
      checked: colors.accent.accent400,
      disabled: colors.neutralLight.neutralsLight50,
      checkedDisabled: colors.accent.accent200,
    },
    boxShadow: {
      default: colors.neutralLight.neutralsLight300,
      checked: colors.accent.accent400,
    },
    border: {
      default: colors.neutralLight.neutralsLight300,
      checked: colors.accent.accent400,
    },
    circle: {
      default: colors.white[100],
      checked: colors.white[100],
    },
  },
  dark: {
    background: {
      default: colors.neutralDark.neutralsDark100,
      disabled: colors.neutralDark.neutralsDark400,
    },
    circle: {
      disabled: colors.neutralDark.neutralsDark100,
    },
  },
};

export const border = {
  dark: {
    default: '1px solid transparent',
  },
  light: {
    default: `1px solid ${color.light.border.default}`,
    checked: `1px solid ${colors.black[2]}`,
    checkDisabled: `1px solid ${colors.black[4]}`,
  },
};

export const animations = {
  transitionDuration: animation.duration.default,
  transitionProperty: 'box-shadow, background-color, left, right',
  transitionTimingFunction: 'ease-out',
};
