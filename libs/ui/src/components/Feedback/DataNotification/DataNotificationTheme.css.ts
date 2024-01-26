import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';

export const [themedDefault, contract] = createTheme({
  background: colors.havelock.havelock600,
  color: colors.havelock.havelock200,
});

export const themedAlert = createTheme(contract, {
  background: colors.alert.alert600,
  color: colors.alert.alert200,
});

export const themedSuccess = createTheme(contract, {
  background: colors.success.success600,
  color: colors.success.success200,
});
