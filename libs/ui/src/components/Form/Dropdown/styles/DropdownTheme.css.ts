import { createTheme } from '@bync/style';

import { Tokens } from '@/styles';
import { colors } from '@/styles/theme';
import { inputTokens } from '@/styles/theme/components';

export const [primary, contract] = createTheme({
  border: {
    default: inputTokens.borders.default.border,
  },
  color: {
    default: inputTokens.colors.text.default.text,
    placeholder: inputTokens.colors.text.default.placeholder,
  },
  backgroundColor: Tokens.colors.white[100],
  icon: {
    color: {
      default: inputTokens.colors.icon.default.default,
      hover: inputTokens.colors.icon.default.hover,
      active: inputTokens.colors.icon.default.active,
      focus: inputTokens.colors.icon.default.focus,
    },
  },
});

export const dark = createTheme(contract, {
  border: {
    default: inputTokens.borders.noBorder.default,
  },
  color: {
    default: 'white',
    placeholder: colors.neutralLight.neutralsLight200,
  },
  backgroundColor: 'transparent',
  icon: {
    color: {
      default: colors.neutralDark.neutralsDark50,
      hover: colors.neutralDark.neutralsDark50,
      active: inputTokens.colors.icon.darkClickable.active,
      focus: inputTokens.colors.icon.dark.active,
    },
  },
});
