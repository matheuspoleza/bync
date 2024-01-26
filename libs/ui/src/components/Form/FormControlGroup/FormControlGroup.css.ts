import { style, styleVariants } from '@bync/style';

import { colors } from '@/styles/theme';

export const containerStyles = styleVariants(
  {
    horizontal: 'row',
    vertical: 'column',
  } as const,
  (layout) => [{ display: 'flex' }, { flexDirection: layout }]
);

export const optionStyles = style({
  marginLeft: '24px',
  display: 'flex',
  cursor: 'pointer',

  selectors: {
    '&:nth-of-type(1)': {
      marginLeft: 0,
    },

    /* horizontal */

    [`${containerStyles.horizontal} > &`]: {
      marginLeft: '24px',
      display: 'flex',
      cursor: 'pointer',
    },

    [`${containerStyles.horizontal} > &:nth-of-type(1)`]: {
      marginLeft: 0,
    },

    /* vertical */

    [`${containerStyles.vertical} > &`]: {
      margin: '12px 0 0 0',
      display: 'flex',
      cursor: 'pointer',
    },

    [`${containerStyles.vertical} > &:nth-of-type(1)`]: {
      marginTop: 0,
    },
  },
});

export const groupLabelStyles = style({
  color: colors.neutralDark.neutralsDark100,
  marginBottom: '8px',
});
