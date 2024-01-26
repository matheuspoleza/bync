import { style } from '@bync/style';

import { colors } from '@/styles/theme';
import { zIndex } from '@/styles/theme/tokens/zIndex';

export const drawerContainer = style({
  position: 'absolute',
  display: 'block',
  minHeight: '100%',
  top: 0,
  right: 0,
  zIndex: zIndex.drawer,
  backgroundColor: colors.white[100],
  borderLeft: `1px solid ${colors.neutralLight.neutralsLight50}`,
});
