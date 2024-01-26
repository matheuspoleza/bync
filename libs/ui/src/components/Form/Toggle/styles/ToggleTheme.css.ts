import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';
import { toggleTokens } from '@/styles/theme/components';

export const [light, contract] = createTheme({
  border: {
    default: toggleTokens.border.light.default,
    checked: toggleTokens.border.light.checked,
    disabled: toggleTokens.border.light.checked,
    checkedDisabled: toggleTokens.border.light.checkDisabled,
  },
  background: {
    default: toggleTokens.color.light.background.default,
    checked: toggleTokens.color.light.background.checked,
    disabled: toggleTokens.color.light.background.disabled,
    checkedDisabled: toggleTokens.color.light.background.checkedDisabled,
  },
  circle: {
    background: {
      default: toggleTokens.color.light.circle.default,
      disabled: toggleTokens.color.light.circle.default,
    },
    border: {
      default: `1px solid ${toggleTokens.color.light.border.default}`,
      checked: '1px solid #598cdf',
      disabled: `1px solid ${colors.black[6]}`,
      disabledChecked: toggleTokens.border.light.checked,
    },
  },
});

export const dark = createTheme(contract, {
  border: {
    default: toggleTokens.border.dark.default,
    checked: toggleTokens.border.dark.default,
    disabled: toggleTokens.border.dark.default,
    checkedDisabled: toggleTokens.border.dark.default,
  },
  background: {
    default: toggleTokens.color.dark.background.default,
    checked: toggleTokens.color.light.background.checked,
    disabled: toggleTokens.color.dark.background.disabled,
    checkedDisabled: toggleTokens.color.dark.background.disabled,
  },
  circle: {
    background: {
      default: toggleTokens.color.light.circle.default,
      disabled: toggleTokens.color.dark.circle.disabled,
    },
    border: {
      default: toggleTokens.border.dark.default,
      checked: toggleTokens.border.dark.default,
      disabled: toggleTokens.border.dark.default,
      disabledChecked: toggleTokens.border.dark.default,
    },
  },
});
