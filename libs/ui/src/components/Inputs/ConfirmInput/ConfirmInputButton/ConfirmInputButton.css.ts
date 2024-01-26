import { style } from '@bync/style';

import { border } from '@/styles/theme';

export const buttonStyle = style({
  borderRadius: `0 0 ${border.radius[8]} ${border.radius[8]}`,
  top: '-2px',
  position: 'relative',
});
