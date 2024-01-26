import { recipe, style } from '@bync/style';

import { Tokens } from '@/styles';
import { transition } from '@/styles/theme';
import { tableTokens } from '@/styles/theme/components';

import { MIN_ROW_HEIGHT } from '../Table.constant';

export const baseTableRowStyle = style({
  display: 'grid',
  padding: '0 12px',
  minHeight: `${MIN_ROW_HEIGHT}px`,
  borderBottom: tableTokens.borders.row.default,

  transition: transition(['background-color']),
});

export const tableRowStyle = recipe({
  base: baseTableRowStyle,

  variants: {
    canClick: {
      true: {
        cursor: 'pointer',
      },
    },

    isHovering: {
      true: {
        backgroundColor: tableTokens.colors.row.background.hovering,
      },
    },

    isActive: {
      true: {
        backgroundColor: tableTokens.colors.row.background.active,
        fontWeight: Tokens.typography.weight[600],
      },
    },
  },

  compoundVariants: [
    {
      variants: { isHovering: true, isActive: true },
      style: { backgroundColor: tableTokens.colors.row.background.active },
    },
  ],
});
