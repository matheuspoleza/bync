import { recipe, style } from '@bync/style';

import { Theme } from '@/styles';
import { colors } from '@/styles/theme';

const HEADER_HEIGHT = 57;

export const containerStyle = style({
  height: '100%',
  width: '350px',
  background: colors.white[100],
  overflow: 'hidden',
});

export const headerContainerStyle = recipe({
  base: {
    height: HEADER_HEIGHT,
    minHeight: HEADER_HEIGHT,
    width: '100%',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  variants: {
    divider: {
      true: {
        borderBottom: `1px solid ${colors.neutralLight.neutralsLight50}`,
      },
    },
  },
});

export const headerTitleContainerStyle = style({
  height: HEADER_HEIGHT,
  overflow: 'hidden',
});

export const headerTitleStyle = style({
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  fontFamily: Theme.vars.font.family.default,
});

export const headerTextAreaStyle = style({
  fontFamily: Theme.vars.font.family.default,
  fontSize: Theme.vars.font.size.h3,
  lineHeight: Theme.vars.font.lineHeight.h3,
  fontWeight: Theme.vars.font.weight.extraBold,
  width: '100%',
  maxWidth: '100%',
  padding: '0',
  border: 'none',
  selectors: {
    '&:focus-visible': {
      boxShadow: 'none',
    },
    '&:focus': {
      boxShadow: 'none',
      outline: 'none',
    },
  },
});

export const headerActionsStyle = style({
  alignSelf: 'flex-end',
  height: HEADER_HEIGHT,
});

export const contentContainerStyle = style({
  width: '100%',
  overflow: 'hidden',
});

export const footerContainerStyle = style({
  width: '100%',
  padding: '8px 12px 12px',
  marginTop: 'auto',
});

export const footerButtonStyle = style({ width: '100%' });
