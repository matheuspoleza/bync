import { style } from '@bync/style';

import { border, colors } from '@/styles/theme';

export const baseCardStyles = style({
  width: '230px',
  position: 'relative',
  textAlign: 'center',
});

export const titleStyles = style({
  marginBottom: '4px',
  marginTop: '20px',
});

export const descriptionStyles = style({
  color: colors.neutralDark.neutralsDark100,
  textAlign: 'center',
  display: 'inline-block',
});

export const linkStyles = style({
  display: 'inline-block',
});

export const buttonContainerStyles = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
  marginBottom: '16px',
});

export const buttonStyles = style({
  width: '100%',
});

export const imageStyles = style({
  height: '120px',
  width: '120px',
  backgroundColor: colors.shades.shades100,
  borderRadius: border.radius.round,
});

export const closeButton = style({
  position: 'absolute',
  right: '12px',
  top: '12px',
  fontSize: '24px',
});
