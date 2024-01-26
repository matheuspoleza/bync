import { border, colors } from '../tokens';
import { surfaceShadows } from '../tokens/shadows';

export const color = {
  container: {
    background: colors.neutralLight.neutralsLight50,
  },
  text: {
    default: colors.neutralDark.neutralsDark200,
    hover: colors.neutralDark.neutralsDark900,
    active: colors.neutralDark.neutralsDark900,
  },
  counter: {
    background: colors.neutralDark.neutralsDark900_8,
    text: colors.neutralDark.neutralsDark300,
  },
  addButton: {
    text: {
      default: colors.neutralDark.neutralsDark100,
      hover: colors.neutralDark.neutralsDark600,
      active: colors.neutralDark.neutralsDark800,
      disabled: colors.neutralLight.neutralsLight600,
    },
    background: {
      default: colors.white[100],
      hover: colors.neutralDark.neutralsDark900_6,
      active: colors.neutralDark.neutralsDark900_12,
    },
  },
};

export const shadows = {
  activeBlock: surfaceShadows.z1Light,
  tabs: `9px 0px 0px -8px ${colors.black[8]}`,
};

export const borders = {
  radius: {
    conatiner: border.radius[8],
    activeBlock: border.radius[6],
    counter: '4px',
    addButton: border.radius[6],
  },
};
