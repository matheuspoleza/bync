import { globalStyle, style } from '@bync/style';

import { transition } from '@/styles/theme';

export const linkStyle = style({
  display: 'inline',
  cursor: 'pointer',
  pointerEvents: 'all',
  position: 'relative',
});

globalStyle(`${linkStyle} [data-slate-leaf="true"]`, {
  transition: transition(['opacity', 'filter']),
});

globalStyle(`${linkStyle}:hover [data-slate-leaf="true"]`, {
  filter: 'brightness(0.9)',
  textDecoration: 'underline',
});
