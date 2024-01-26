import type { ComplexStyleRule } from '@bync/style';

import { border, colors } from '@/styles/theme';

export const AlertVariant: ComplexStyleRule = {
  borderRadius: border.radius.round,
  height: '4px',
  width: '4px',
  boxSizing: 'content-box',
  backgroundColor: colors.alert.alert600,
  position: 'absolute',
};
