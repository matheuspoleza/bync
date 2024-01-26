import { recipe, style } from '@bync/style';

import { transition } from '@/styles/theme';
import { button, tabTokens } from '@/styles/theme/components';

export const addTabBaseStyle = style({
  border: '0',
  transition: transition(button.animations.properties),
  cursor: 'pointer',
  borderRadius: tabTokens.borders.radius.addButton,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '28px',
  width: '100%',
  marginTop: '2px',
  margin: '2px 0 0 0',
  marginRight: '-1px',
  backgroundColor: 'transparent',
  color: tabTokens.color.addButton.text.default,
  selectors: {
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: tabTokens.color.addButton.background.default,
      color: tabTokens.color.addButton.text.disabled,
    },
    '&:hover': {
      backgroundColor: tabTokens.color.addButton.background.hover,
      color: tabTokens.color.addButton.text.hover,
    },
    '&:active': {
      backgroundColor: tabTokens.color.addButton.background.active,
      color: tabTokens.color.addButton.text.active,
    },
  },
});

export const addTabStyles = recipe({
  base: addTabBaseStyle,

  variants: {
    width: {
      fill: [addTabBaseStyle, { marginLeft: '-0.25px', marginRight: '.5px' }],
      hug: [addTabBaseStyle],
    },
    size: {
      large: [addTabBaseStyle, { height: '31px' }],
      default: [addTabBaseStyle],
    },
  },
});
