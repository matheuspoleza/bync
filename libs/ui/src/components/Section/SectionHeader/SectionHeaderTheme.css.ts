import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';

export const [light, contract] = createTheme({
  color: {
    header: {
      active: colors.neutralDark.neutralsDark900,
      disabled: colors.neutralLight.neutralsLight600,
    },
    title: {
      default: colors.neutralDark.neutralsDark200,
      hover: colors.neutralDark.neutralsDark600,
      active: colors.neutralDark.neutralsDark900,
      disabled: colors.neutralLight.neutralsLight600,
    },
    caption: {
      default: colors.neutralDark.neutralsDark100,
      hover: colors.neutralDark.neutralsDark300,
      disabled: colors.neutralLight.neutralsLight600,
    },
    background: {
      default: colors.white[100],
    },
    button: {
      default: colors.neutralDark.neutralsDark100,
      hover: colors.neutralDark.neutralsDark300,
      active: colors.neutralDark.neutralsDark800,
      disabled: colors.neutralLight.neutralsLight600,
    },
  },
});

export const dark = createTheme(contract, {
  color: {
    header: {
      active: colors.neutralDark.neutralsDark900,
      disabled: colors.neutralLight.neutralsLight600,
    },
    title: {
      default: colors.neutralLight.neutralsLight200,
      hover: colors.neutralLight.neutralsLight200,
      active: colors.neutralLight.neutralsLight200,
      disabled: colors.neutralLight.neutralsLight200,
    },
    caption: {
      default: colors.neutralLight.neutralsLight600,
      hover: colors.neutralLight.neutralsLight600,
      disabled: colors.neutralLight.neutralsLight600,
    },
    background: {
      default: colors.neutralDark.neutralsDark600,
    },
    button: {
      default: 'inheirit',
      hover: 'inheirit',
      active: 'inheirit',
      disabled: 'inheirit',
    },
  },
});
