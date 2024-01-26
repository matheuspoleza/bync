import { createThemeContract } from '@bync/style';

import { typography } from '@/styles/theme/tokens';

import { text } from './theme/components';

export const spacing = {
  sm: '2px',
  md: '4px',
  lg: '8px',
};

export const theme = {
  color: {
    font: text.color,
  },
  spacing,
  font: {
    family: {
      default: typography.family.regular,
      code: typography.family.code,
    },
    size: {
      h1: typography.size[40],
      h2: typography.size[22],
      h3: typography.size[16],
      h4: typography.size[14],
      default: typography.size[14],
      field: typography.size[13],
      tableHeader: typography.size[13],
      caption: typography.size[12],
      subcaption: typography.size[11],
      codeLarge: typography.size[14],
      code: typography.size[12],
    },
    weight: {
      extraBold: typography.weight[700],
      bold: typography.weight[600],
      regular: typography.weight[400],
      code: typography.weight[450],
    },
    lineHeight: {
      h1: typography.lineHeight[48],
      h2: typography.lineHeight[30],
      h3: typography.lineHeight[23],
      h4: typography.lineHeight[20],
      basic: typography.lineHeight[20],
      paragraph: typography.lineHeight[22],
      field: typography.lineHeight[18],
      tableHeader: typography.lineHeight[18],
      caption: typography.lineHeight[17],
      subcaption: typography.lineHeight[15],
      codeLarge: typography.lineHeight[22],
      code: typography.lineHeight[18],
    },
  },
};

export const vars = createThemeContract(theme);
