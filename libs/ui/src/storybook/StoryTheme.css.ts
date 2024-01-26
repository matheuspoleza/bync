import { createTheme } from '@bync/style';

import { Tokens } from '@/styles';

export const [light, contract] = createTheme({
  color: {
    text: Tokens.colors.neutralDark.neutralsDark200,
    border: Tokens.colors.neutralLight.neutralsLight100,
  },
});

export const dark = createTheme(contract, {
  color: {
    text: Tokens.colors.neutralLight.neutralsLight200,
    border: Tokens.colors.neutralDark.neutralsDark100,
  },
});
