import { style } from '@bync/style';

import { colors } from '@/styles/theme';

export const spinnerStyles = style({
  transform: 'translate(-50%, -50%)',
  position: 'absolute',
});

export const baseButton = style({
  color: colors.neutralLight.neutralsLight50,
  boxShadow: '0px -1px 0px 0px #191D22 inset',

  padding: 16,
  fontSize: 24,

  ':hover': {
    color: colors.neutralLight.neutralsLight100,
    boxShadow: '0px -1px 0px 0px #191D22 inset, inset -1px 0px 0px rgba(25, 29, 34, 0.32)',
  },
});
