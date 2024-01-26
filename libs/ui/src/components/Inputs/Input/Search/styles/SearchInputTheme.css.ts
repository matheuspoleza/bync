import { createTheme } from '@bync/style';

import { colors } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

export const [light, contract] = createTheme({
  border: {
    default: 'none',
  },
  color: {
    default: colors.neutralDark.neutralsDark900,
    placeholder: colors.neutralDark.neutralsDark50,
  },
  icon: {
    color: {
      default: colors.neutralDark.neutralsDark100,
      active: colors.accent.accent500,
      hover: colors.accent.accent600,
    },
  },
});

export const dark = createTheme(contract, {
  border: {
    default: inputTokens.borders.noBorder.default,
  },
  color: {
    default: colors.neutralLight.neutralsLight50,
    placeholder: inputTokens.colors.text.default.placeholder,
  },
  icon: {
    color: {
      default: colors.neutralDark.neutralsDark100,
      active: colors.accent.accent300,
      hover: colors.accent.accent200,
    },
  },
});
