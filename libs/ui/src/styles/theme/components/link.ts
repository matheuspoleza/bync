import { colors } from '../tokens';

export const font = {
  size: {
    medium: '14px',
    small: '12px',
  },
};

export const linkLightTokens = {
  color: {
    default: colors.accent.accent500,
    hover: colors.accent.accent500,
    active: colors.accent.accent600,
    secondary: {
      default: colors.neutralDark.neutralsDark100,
      hover: colors.accent.accent500,
    },
    dotted: {
      default: colors.accent.accent500,
      hover: colors.accent.accent700,
      active: colors.accent.accent700,
      underline: {
        default: colors.accent.accent600,
        hover: colors.accent.accent700,
        active: 'transparent',
      },
    },
  },
  size: font.size,
};

export const darkLinkTokens = {
  color: {
    default: colors.accent.accent200,
    hover: colors.accent.accent400,
    active: colors.accent.accent400,
    secondary: {
      default: colors.neutralLight.neutralsLight700,
      hover: colors.accent.accent400,
    },
    dotted: {
      default: colors.accent.accent200,
      hover: colors.accent.accent400,
      active: colors.accent.accent400,
      underline: {
        default: colors.accent.accent300,
        hover: colors.accent.accent500,
        active: 'transparent',
      },
    },
  },
  size: font.size,
};
