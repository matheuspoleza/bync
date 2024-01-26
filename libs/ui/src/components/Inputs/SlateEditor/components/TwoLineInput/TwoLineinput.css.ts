import { style } from '@bync/style';

import { Theme } from '@/styles';

export const containerStyle = style({
  width: '100%',
});

export const lineOneStyles = style({
  fontSize: Theme.vars.font.size.default,
  padding: '0px',
  border: 'none',
  width: '100%',
  selectors: {
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
});

export const lineTwoBaseStyles = style({
  fontSize: Theme.vars.font.size.caption,
  lineHeight: Theme.vars.font.lineHeight.caption,
  padding: '0px',
  border: 'none',
  width: '100%',
  selectors: {
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
});
