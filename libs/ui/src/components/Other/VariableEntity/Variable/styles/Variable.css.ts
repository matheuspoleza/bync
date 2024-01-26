import { recipe, style, styleVariants } from '@bync/style';

import { border, transition } from '@/styles/theme';

import * as VariableTheme from './VariableTheme.css';

export const bracketStyle = recipe({
  base: {
    transition: transition(['opacity', 'visibility']),
    height: '16px',
    minWidth: '8px',
    color: VariableTheme.contract.bracket,

    selectors: {
      '&:first-of-type': {
        marginRight: '1.5px',
      },
      '&:last-of-type': {
        marginLeft: '1.5px',
      },
    },
  },

  variants: {
    isActive: {
      true: {
        opacity: 0,
      },
    },
  },
});

export const borderBracketStyle = style({
  fill: VariableTheme.contract.border,
});

export const container = style({
  display: 'flex',
  alignItems: 'center',
  width: 'fit-content',
  paddingBottom: '1px',
  height: '17px',
  position: 'relative',
  borderRadius: border.radius[5],
  boxSizing: 'content-box',
  maxWidth: '100%',
});

export const sizeVariants = styleVariants({
  large: {
    fontSize: '14px',
  },
  default: {
    fontSize: '12px',
  },
});

export const isActiveVariants = styleVariants({
  true: {
    selectors: {
      '&::before': {
        position: 'absolute',
        top: '0',
        right: '3px',
        bottom: '0',
        left: '3px',
        borderRadius: '5px',
        boxShadow: '0 0 0 2px #387eff',
        content: '',
        opacity: '1',
      },
    },
  },
});

export const textRecipe = recipe({
  base: {
    lineHeight: '14px',
    paddingTop: '2px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    color: VariableTheme.contract.text,
  },

  variants: {
    size: sizeVariants,
    isActive: isActiveVariants,
  },
});
