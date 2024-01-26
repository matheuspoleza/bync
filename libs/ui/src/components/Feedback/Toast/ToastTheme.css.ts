import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';

export const [themedDefault, contract] = createTheme({
  color: colors.neutralLight.neutralsLight200,
  backgroundColor: colors.neutralDark.neutralsDark500,
  icon: {
    color: colors.neutralLight.neutralsLight600,
  },
  text: {
    color: colors.neutralLight.neutralsLight200,
  },
});

export const themedAlert = createTheme(contract, {
  color: colors.alert.alert100,
  backgroundColor: colors.alert.alert700,
  icon: {
    color: colors.alert.alert300,
  },
  text: {
    color: colors.alert.alert100,
  },
});

export const themedSuccess = createTheme(contract, {
  color: colors.success.success50,
  backgroundColor: colors.success.success600,
  icon: {
    color: colors.success.success200,
  },
  text: {
    color: colors.success.success50,
  },
});
