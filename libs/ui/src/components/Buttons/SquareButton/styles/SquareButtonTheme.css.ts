import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';

export const [light, contract] = createTheme({
  color: {
    default: colors.neutralDark.neutralsDark100,
    hover: colors.neutralDark.neutralsDark600,
    active: colors.neutralDark.neutralsDark800,
    disabled: colors.neutralLight.neutralsLight600,
  },
  backgroundColor: {
    hover: colors.neutralDark.neutralsDark900_6,
    active: colors.neutralDark.neutralsDark900_12,
    disabled: colors.white[100],
  },
});

export const dark = createTheme(contract, {
  color: {
    default: colors.neutralLight.neutralsLight600,
    hover: colors.neutralLight.neutralsLight300,
    active: colors.neutralLight.neutralsLight50,
    disabled: colors.neutralDark.neutralsDark200,
  },
  backgroundColor: {
    hover: colors.neutralDark.neutralsDark400,
    active: colors.neutralDark.neutralsDark200,
    disabled: colors.neutralDark.neutralsDark600,
  },
});
