import { createVar, style } from '@/main';

export const colorVar = createVar();

export const base = style({
  vars: {
    [colorVar]: 'red',
  },

  backgroundColor: colorVar,
  borderRadius: 0,
});
