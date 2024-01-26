import { recipe, style } from '@bync/style';

import { transition } from '@/styles/theme';
import { tabTokens } from '@/styles/theme/components';

const baseTabGroupContainer = style({
  position: 'relative',
  display: 'inline-flex',
  width: 'fit-content',
  margin: '0',
  paddingInlineStart: '0',
  padding: '0 2px',
  backgroundColor: tabTokens.color.container.background,
  borderRadius: tabTokens.borders.radius.conatiner,
  height: '32px',
  boxSizing: 'content-box',
});

export const tabGroupContainer = recipe({
  base: baseTabGroupContainer,
  variants: {
    size: {
      large: {
        height: '35px',
      },
      default: baseTabGroupContainer,
    },
    width: {
      hug: {
        width: 'fit-content',
      },
      fill: {
        width: '100%',
      },
    },
  },
});

export const tabWrapperStyles = style({
  zIndex: '2',
  display: 'flex',
  position: 'relative',
  transition: transition(['box-shadow']),
});

export const tabWrapperRecipe = recipe({
  base: tabWrapperStyles,
  variants: {
    showDivider: {
      true: {
        boxShadow: tabTokens.shadows.tabs,
      },
      false: {
        boxShadow: 'none',
      },
    },
    width: {
      hug: {
        width: 'fit-content',
      },
      fill: {
        width: '100%',
      },
    },
  },
});

export const activeBlock = style({
  top: '2px',
  bottom: '2px',
  borderRadius: tabTokens.borders.radius.activeBlock,
  position: 'absolute',
  backgroundColor: 'white',
  transition: transition(['left', 'width']),
  boxShadow: tabTokens.shadows.activeBlock,
});

export const addButton = style({
  marginLeft: '2px',
  minWidth: '55px',
  boxSizing: 'content-box',
});
