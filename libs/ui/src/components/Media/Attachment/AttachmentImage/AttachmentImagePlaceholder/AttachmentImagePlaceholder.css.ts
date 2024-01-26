import type { ComplexStyleRule } from '@bync/style';
import { style } from '@bync/style';

import { border, colors, shadows } from '@/styles/theme';

const quarterStyle: ComplexStyleRule = {
  content: '',
  display: 'block',
  position: 'absolute',
  backgroundColor: 'rgb(93 157 245 / 50%)',
  width: '50%',
  height: '50%',
};

export const placeholderStyles = style({
  display: 'flex',
  width: 32,
  height: 32,
  borderRadius: border.radius[8],
  position: 'relative',
  backgroundColor: colors.white[100],
  boxShadow: shadows.shadesGlows['0-100Inner'][4],
  overflow: 'hidden',

  selectors: {
    '&::before': quarterStyle,
    '&::after': {
      ...quarterStyle,
      right: 0,
      bottom: 0,
    },
  },
});
