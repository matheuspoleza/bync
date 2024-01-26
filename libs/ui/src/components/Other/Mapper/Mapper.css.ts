import { globalStyle, style } from '@bync/style';

import { colors } from '@/styles/theme';

export const mapperContainer = style({
  minHeight: 36,
  maxWidth: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 24px 1fr',
  gap: '4px',
  padding: '0px  0px 7px',
});

export const leftHandSideStyles = style({
  justifyContent: 'stretch',
  paddingTop: 5,
});

export const centerStyles = style({
  width: '24px',
  height: '24px',
  margin: '0px 4px',
  paddingTop: 3,
  display: 'block',
  justifySelf: 'center',
});

export const rightHandSideStyles = style({
  overflowWrap: 'break-word',
  wordBreak: 'break-word',
  paddingTop: 5,
});

export const iconStyles = style({
  color: colors.neutralDark.neutralsDark50,
  width: 24,
  height: 24,
});

export const textStyles = style({
  paddingLeft: 5,
});

globalStyle(`${leftHandSideStyles} input, ${rightHandSideStyles} input`, {
  paddingTop: 0,
  paddingBottom: 0,
  paddingLeft: 5,
});
