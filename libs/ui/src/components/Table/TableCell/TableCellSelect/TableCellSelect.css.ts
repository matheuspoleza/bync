import { recipe, styleVariants } from '@bync/style';

import { baseTableRowStyle } from '../../TableRow/TableRow.css';

const withChildrenVariant = styleVariants({
  true: {},
});

export const containerStyle = recipe({
  base: {
    display: 'flex',
    width: '24px',
    height: '24px',
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    margin: -4,
    marginRight: -8,
  },

  variants: {
    withIcon: withChildrenVariant,
  },
});

export const checkboxContainerStyle = recipe({
  base: {
    display: 'flex',
  },

  variants: {
    withIcon: {
      true: {
        selectors: {
          [`${baseTableRowStyle}:not(:hover) &`]: {
            display: 'none',
          },
        },
      },
    },
    isSelected: {
      true: {
        display: 'flex',
      },
    },
  },
});

export const iconContainerStyle = recipe({
  base: {
    display: 'none',

    selectors: {
      [`${baseTableRowStyle}:not(:hover) &`]: {
        display: 'flex',
        width: '24px',
        height: '24px',
        alignItems: 'center',
        justifyContent: 'center',
      },
    },
  },

  variants: {
    isSelected: {
      true: {
        display: 'none',

        selectors: {
          [`${baseTableRowStyle}:not(:hover) &`]: {
            display: 'none',
          },
        },
      },
    },
  },
});
