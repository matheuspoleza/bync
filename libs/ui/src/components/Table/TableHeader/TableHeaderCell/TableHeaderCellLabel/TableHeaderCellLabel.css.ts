import { recipe, style, styleVariants } from '@bync/style';

import { transition } from '@/styles/theme';
import { tableTokens } from '@/styles/theme/components';

const baseStyle = style({
  color: tableTokens.colors.header.default,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

export const labelStyle = style({ textOverflow: 'ellipsis', overflow: 'hidden' });

const activeVariant = styleVariants({
  true: {
    color: tableTokens.colors.header.active,
  },
});

export const containerStyle = recipe({
  base: baseStyle,

  variants: {
    active: activeVariant,

    sortable: {
      true: {
        cursor: 'pointer',
        userSelect: 'none',
      },
    },
  },
});

export const iconStyle = style({
  marginTop: -10,
  marginBottom: -10,
  opacity: 0,
  transition: transition(['opacity']),

  selectors: {
    [`${baseStyle}:hover &`]: {
      opacity: 1,
    },

    [`${activeVariant.true} &`]: {
      opacity: 1,
    },
  },
});
