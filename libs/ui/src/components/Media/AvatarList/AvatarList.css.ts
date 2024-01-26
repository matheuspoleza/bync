import { style } from '@bync/style';

import { Avatar } from '@/components/Media/Avatar';
import { border, colors } from '@/styles/theme';

export const avatarListContainer = style({
  display: 'inline-flex',
  padding: '4px 6px',
});

export const avatarList = style({
  width: 'inherit',
  height: 'inherit',
  position: 'absolute',
  borderRadius: border.radius.round,
  objectFit: 'cover',
});

export const avatarItemContainer = style({
  order: 1,
  marginLeft: '-3px',
  boxShadow: `0px 0px 0px 2px ${colors.neutralDark.neutralsDark800}`,
});

export const avatarListButton = style([
  Avatar.css.avatarRecipe({ size: 'medium' }),
  avatarItemContainer,
  {
    backgroundColor: colors.neutralDark.neutralsDark400,
    color: colors.neutralLight.neutralsLight300,
    cursor: 'pointer',
    display: 'flex',
    flexShrink: 0,
    padding: 2,

    selectors: {
      '&:enabled:hover': {
        color: colors.neutralLight.neutralsLight100,
        backgroundColor: colors.neutralDark.neutralsDark300,
      },
      '&:enabled:active': {
        color: colors.neutralLight.neutralsLight50,
        backgroundColor: colors.neutralDark.neutralsDark200,
      },
    },
  },
]);

export const avatarToolTipModifier = style({
  right: '-1px',
});
