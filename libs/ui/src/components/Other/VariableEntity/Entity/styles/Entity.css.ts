import { recipe, style } from '@bync/style';

import { border, transition } from '@/styles/theme';
import { variableEntityTokens } from '@/styles/theme/components';
import { shadesGlows } from '@/styles/theme/tokens/shadows';

import * as EntityTheme from './EntityTheme.css';

export const bracketStyle = style({
  transition: transition(['opacity', 'visibility']),
  height: '16px',
  minWidth: '8px',
  color: EntityTheme.contract.bracket,

  selectors: {
    '&:first-of-type': {
      marginRight: '1.5px',
    },
    '&:last-of-type': {
      marginLeft: '1.5px',
    },
  },
});

export const bracketPaddingStyles = style({
  fill: 'none',
});

const container = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  padding: '0 2px',
  paddingBottom: '1.5px',
  height: '17px',
  position: 'relative',
  borderRadius: border.radius[5],
  backgroundColor: EntityTheme.contract.background,
  boxShadow: shadesGlows['0-100Inner'][12],
  transition: transition(['box-shadow']),
  boxSizing: 'content-box',
  maxWidth: 'calc(100% - 4px)',
});

export const containerRecipe = recipe({
  base: container,
  variants: {
    isActive: {
      true: {
        boxShadow: variableEntityTokens.shadows.isActive.true,
      },
      false: {
        boxShadow: variableEntityTokens.shadows.isActive.false,
      },
    },
  },
});

export const textRecipe = recipe({
  base: {
    paddingTop: '3px',
    whiteSpace: 'nowrap',
    color: EntityTheme.contract.text,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },

  variants: {
    size: {
      large: {
        fontSize: '14px',
      },
      default: {
        fontSize: '12px',
      },
    },
  },
});
