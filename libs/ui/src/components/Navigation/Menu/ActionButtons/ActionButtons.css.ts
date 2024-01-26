import { style } from '@bync/style';

import { colors } from '@/styles/theme';

export const container = style({
  height: '50px',
  borderTop: `1px solid ${colors.neutralLight.neutralsLight50}`,
});

export const divider = style({
  display: 'block',
  width: '2px',
  backgroundColor: colors.neutralLight.neutralsLight50,
  height: '100%',
});
