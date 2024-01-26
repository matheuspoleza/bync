import { createTheme } from '@bync/style';

import { Tokens } from '@/styles';
import { inputTokens } from '@/styles/theme/components';

export const [primary, contract] = createTheme({
  border: {
    default: inputTokens.borders.default.border,
    radius: inputTokens.borders.default.radius,
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

export const ghost = createTheme(contract, {
  border: {
    default: inputTokens.borders.noBorder.default,
    radius: '0',
  },
  color: {
    default: inputTokens.colors.text.default.text,
    placeholder: inputTokens.colors.text.default.placeholder,
  },
  backgroundColor: Tokens.colors.white[100],
  icon: {
    color: {
      default: inputTokens.colors.icon.ghost.default,
      hover: inputTokens.colors.icon.default.hover,
      active: inputTokens.colors.icon.default.active,
      focus: inputTokens.colors.icon.ghost.active,
    },
  },
});

export const dark = createTheme(contract, {
  border: {
    default: inputTokens.borders.noBorder.default,
    radius: inputTokens.borders.default.radius,
  },
  color: {
    default: inputTokens.colors.text.dark.text,
    placeholder: inputTokens.colors.text.dark.placeholder,
  },
  backgroundColor: 'transparent',
  icon: {
    color: {
      default: inputTokens.colors.icon.dark.default,
      hover: inputTokens.colors.icon.darkClickable.hover,
      active: inputTokens.colors.icon.darkClickable.active,
      focus: inputTokens.colors.icon.dark.active,
    },
  },
});
