import { colors as colorTokens } from '../tokens';

export const colors = {
  header: {
    default: colorTokens.neutralDark.neutralsDark100,
    active: colorTokens.neutralDark.neutralsDark900,
  },

  row: {
    background: {
      active: colorTokens.shades.shades100,
      hovering: colorTokens.shades.shades50,
    },
  },
};

export const borders = {
  row: {
    default: `1px solid ${colorTokens.shades.shades100}`,
  },
};
