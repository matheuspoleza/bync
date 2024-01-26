import { style } from '@bync/style';

import { Tokens } from '@/styles';

export const containerStyles = style({
  fontSize: 13,
  color: Tokens.colors.neutralLight.neutralsLight200,
  padding: '12px 12px 0 24px',
});

export const contentStyle = style({
  padding: '0 12px 0 12px',
});

export const secondaryNavigationSectionTitleContainer = style({
  margin: '12px 12px 0 24px',
  padding: '8px 0',
  color: Tokens.colors.neutralLight.neutralsLight200,
  fontSize: 13,
});
