import { style } from '@bync/style';

import { Tokens } from '@/styles';

export const groupTitleStyles = style({
  margin: '1rem 0 1rem 1rem',
});

export const groupLinkStyles = style({
  display: 'inline-block',
  marginLeft: '.5rem',
  fontSize: Tokens.typography.size[22],
});

export const groupCountStyles = style({
  display: 'inline',
  marginLeft: '.5rem',
  fontSize: Tokens.typography.size[16],
  color: Tokens.colors.neutralLight.neutralsLight600,
});
