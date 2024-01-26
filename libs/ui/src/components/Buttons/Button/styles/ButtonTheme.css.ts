import { createTheme } from '@bync/style';

import { Theme } from '@/styles';
import { colors, shadows } from '@/styles/theme';

const themedShadow = 'inset 0px 0px 1px rgba(255, 255, 255, 0.12)';

export const [primary, contract] = createTheme({
  color: {
    default: Theme.vars.color.font.light,
    hover: Theme.vars.color.font.light,
    active: Theme.vars.color.font.light,
    disabled: colors.accent.accent50,
  },
  backgroundColor: {
    default: colors.accent.accent500,
    hover: colors.accent.accent600,
    active: colors.accent.accent700,
    disabled: colors.accent.accent300,
  },
  boxShadow: {
    default: shadows.buttonShadows.primary.default,
    hover: shadows.buttonShadows.primary.hover,
    active: shadows.buttonShadows.primary.active,
    disabled: shadows.buttonShadows.primary.disabled,
  },
  icon: {
    color: {
      default: colors.accent.accent50,
      hover: colors.accent.accent50,
      active: colors.accent.accent50,
      disabled: colors.accent.accent100,
    },
  },
});

export const secondary = createTheme(contract, {
  color: {
    default: colors.neutralDark.neutralsDark500,
    hover: colors.neutralDark.neutralsDark700,
    active: colors.neutralDark.neutralsDark900,
    disabled: colors.neutralDark.neutralsDark50,
  },
  backgroundColor: {
    default: colors.neutralDark.neutralsDark900_8,
    hover: colors.neutralDark.neutralsDark900_12,
    active: colors.neutralDark.neutralsDark900_20,
    disabled: colors.neutralDark.neutralsDark900_6,
  },
  boxShadow: {
    default: shadows.buttonShadows.secondaryLight,
    hover: shadows.buttonShadows.secondaryLight,
    active: shadows.buttonShadows.secondaryLight,
    disabled: shadows.buttonShadows.secondaryLight,
  },
  icon: {
    color: {
      default: colors.neutralDark.neutralsDark400,
      hover: colors.neutralDark.neutralsDark600,
      active: colors.neutralDark.neutralsDark800,
      disabled: colors.neutralLight.neutralsLight600,
    },
  },
});

export const secondaryDark = createTheme(contract, {
  color: {
    default: colors.neutralLight.neutralsLight200,
    hover: colors.neutralLight.neutralsLight100,
    active: colors.neutralLight.neutralsLight50,
    disabled: colors.neutralDark.neutralsDark100,
  },
  backgroundColor: {
    default: colors.neutralDark.neutralsDark400,
    hover: colors.neutralDark.neutralsDark300,
    active: colors.neutralDark.neutralsDark200,
    disabled: colors.neutralDark.neutralsDark600,
  },
  boxShadow: {
    default: shadows.buttonShadows.secondaryDark.default,
    hover: shadows.buttonShadows.secondaryDark.hover,
    active: shadows.buttonShadows.secondaryLight,
    disabled: shadows.buttonShadows.secondaryLight,
  },
  icon: {
    color: {
      default: colors.neutralLight.neutralsLight200,
      hover: colors.neutralLight.neutralsLight100,
      active: colors.neutralLight.neutralsLight50,
      disabled: colors.neutralDark.neutralsDark200,
    },
  },
});

export const tertiary = createTheme(contract, {
  color: {
    default: colors.neutralDark.neutralsDark500,
    hover: colors.accent.accent500,
    active: colors.accent.accent50,
    disabled: colors.neutralDark.neutralsDark100,
  },
  backgroundColor: {
    default: colors.white[100],
    hover: colors.accent.accent50,
    active: colors.accent.accent500,
    disabled: colors.white[100],
  },
  boxShadow: {
    default: 'none',
    hover: 'none',
    active: 'none',
    disabled: 'none',
  },
  icon: {
    color: {
      default: colors.neutralDark.neutralsDark300,
      hover: colors.accent.accent500,
      active: colors.accent.accent50,
      disabled: colors.neutralDark.neutralsDark100,
    },
  },
});

export const tertiaryDark = createTheme(contract, {
  color: {
    default: colors.neutralLight.neutralsLight200,
    hover: colors.neutralLight.neutralsLight100,
    active: colors.neutralLight.neutralsLight50,
    disabled: colors.neutralDark.neutralsDark100,
  },
  backgroundColor: {
    default: 'transparent',
    hover: colors.neutralDark.neutralsDark400,
    active: colors.neutralDark.neutralsDark200,
    disabled: 'transparent',
  },
  boxShadow: {
    default: 'none',
    hover: '0px 1px 2px -1px rgba(0, 0, 0, 0.4)',
    active: 'none',
    disabled: 'none',
  },
  icon: {
    color: {
      default: colors.neutralLight.neutralsLight600,
      hover: colors.neutralLight.neutralsLight300,
      active: colors.neutralLight.neutralsLight50,
      disabled: colors.neutralDark.neutralsDark200,
    },
  },
});

export const alert = createTheme(contract, {
  color: {
    default: colors.white[100],
    hover: colors.white[100],
    active: colors.white[100],
    disabled: colors.alert.alert50,
  },
  backgroundColor: {
    default: colors.alert.alert700,
    hover: colors.alert.alert800,
    active: colors.alert.alert800,
    disabled: colors.alert.alert400,
  },
  boxShadow: {
    default: shadows.buttonShadows.alert.default,
    hover: shadows.buttonShadows.alert.hover,
    active: shadows.buttonShadows.alert.active,
    disabled: shadows.buttonShadows.primary.disabled,
  },
  icon: {
    color: {
      default: colors.white[100],
      hover: colors.white[100],
      active: colors.white[100],
      disabled: colors.alert.alert50,
    },
  },
});

export const themedDefault = createTheme(contract, {
  color: {
    default: colors.neutralLight.neutralsLight100,
    hover: colors.white[100],
    active: colors.white[100],
    disabled: colors.white[100],
  },
  backgroundColor: {
    default: colors.neutralDark.neutralsDark200,
    hover: colors.neutralDark.neutralsDark100,
    active: colors.neutralDark.neutralsDark50,
    disabled: colors.neutralDark.neutralsDark50,
  },
  boxShadow: {
    default: themedShadow,
    hover: themedShadow,
    active: themedShadow,
    disabled: themedShadow,
  },
  icon: {
    color: {
      default: colors.neutralLight.neutralsLight100,
      hover: colors.white[100],
      active: colors.white[100],
      disabled: colors.white[100],
    },
  },
});

export const themedSuccess = createTheme(contract, {
  color: {
    default: colors.success.success50,
    hover: colors.white[100],
    active: colors.white[100],
    disabled: colors.white[100],
  },
  backgroundColor: {
    default: colors.success.success500,
    hover: colors.success.success400,
    active: colors.success.success300,
    disabled: colors.success.success300,
  },
  boxShadow: {
    default: themedShadow,
    hover: themedShadow,
    active: themedShadow,
    disabled: themedShadow,
  },
  icon: {
    color: {
      default: colors.success.success50,
      hover: colors.white[100],
      active: colors.white[100],
      disabled: colors.white[100],
    },
  },
});

export const themedAlert = createTheme(contract, {
  color: {
    default: colors.alert.alert50,
    hover: colors.white[100],
    active: colors.white[100],
    disabled: colors.white[100],
  },
  backgroundColor: {
    default: colors.alert.alert600,
    hover: colors.alert.alert500,
    active: colors.alert.alert400,
    disabled: colors.alert.alert400,
  },
  boxShadow: {
    default: themedShadow,
    hover: themedShadow,
    active: themedShadow,
    disabled: themedShadow,
  },
  icon: {
    color: {
      default: colors.alert.alert50,
      hover: colors.white[100],
      active: colors.white[100],
      disabled: colors.white[100],
    },
  },
});
