import { style } from '@bync/style';

import { tableTokens } from '@/styles/theme/components';

export const tableHeaderStyle = style({
  display: 'grid',
  padding: '0 12px',
  minHeight: '44px',
  borderBottom: tableTokens.borders.row.default,
});
