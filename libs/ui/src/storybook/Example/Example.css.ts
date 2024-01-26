import { recipe, style } from '@bync/style';

import { Tokens } from '@/styles';

import * as StoryTheme from '../StoryTheme.css';

export const exampleStyles = recipe({
  base: {
    position: 'relative',
    margin: '1rem',
    padding: '1rem',
    border: `1px solid ${StoryTheme.contract.color.border}`,
    borderRadius: Tokens.border.radius[6],
    height: 'fit-content',
  },
  variants: {
    variant: {
      light: {
        backgroundColor: Tokens.colors.white[100],
      },
      dark: {
        backgroundColor: Tokens.colors.neutralDark.neutralsDark800,
      },
    },
    basis: {
      all: { flexBasis: 'calc(100% - 2rem)' },
      half: { flexBasis: 'calc(50% - 2rem)' },
      third: { flexBasis: 'calc(33.333% - 2rem)' },
      quarter: { flexBasis: 'calc(25% - 2rem)' },
      fifth: { flexBasis: 'calc(20% - 2rem)' },
      sixth: { flexBasis: 'calc(16.666% - 2rem)' },
      eighth: { flexBasis: 'calc(12.5% - 2rem)' },
      tenth: { flexBasis: 'calc(10% - 2rem)' },
    },
  },
});

export const exampleInfoStyles = style({
  width: '100%',
  borderTop: `1px solid ${StoryTheme.contract.color.border}`,
  marginTop: '1rem',
});
