import { style } from '@bync/style';

import { border } from '@/styles/theme';

export const imageStyles = style({
  position: 'relative',
  objectFit: 'cover',
  minWidth: 32,
  borderRadius: border.radius[8],
  width: 32,
  height: 32,
});
