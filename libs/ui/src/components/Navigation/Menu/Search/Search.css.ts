import { recipe, style } from '@bync/style';

import { border, colors } from '@/styles/theme';

export const container = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'relative',
  maxWidth: '100%',
  flexGrow: 1,
  padding: '4px 0',
  paddingLeft: '4px',
  backgroundColor: colors.white[100],
  borderTopRightRadius: border.radius[10],
  borderTopLeftRadius: border.radius[10],
  borderBottom: `1px solid ${colors.neutralLight.neutralsLight50}`,
});

export const inputContainer = style({
  width: '100%',
});

export const suffixIconStyles = style({
  marginRight: '12px',
});

export const inputModifier = style({
  maxWidth: '100%',
  selectors: {
    '&:focus': {
      boxShadow: 'none',
    },
  },
});

export const searchIconRecipe = recipe({
  variants: {
    hasValue: {
      true: {
        selectors: {
          '&:hover': {
            color: colors.accent.accent600,
          },
          '&:active': {
            color: colors.accent.accent500,
          },
        },
      },
    },
  },
});
