import { style } from '@bync/style';

import { surfaceTokens } from '@/styles/theme/components';

export const surfaceStyles = style({
  background: surfaceTokens.color.background,
  boxShadow: surfaceTokens.shadow.default,
  borderRadius: surfaceTokens.borders.radius,
});
