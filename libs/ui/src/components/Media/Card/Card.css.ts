import { style, styleVariants } from '@bync/style';

import { colors } from '@/styles/theme';

export const baseCardStyles = style({
  padding: '24px',
  paddingBottom: '0px',
  width: '280px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  textAlign: 'center',
});

export const cardStyles = styleVariants({
  vertical: [baseCardStyles, {}],
  horizontal: [baseCardStyles, {}],
});

export const titleStyles = style({
  marginBottom: '4px',
});

const baseDescriptionStyles = style({
  color: colors.neutralDark.neutralsDark100,
  textAlign: 'center',
  display: 'inline-block',
});

export const descriptionStyles = styleVariants({
  withPadding: [baseDescriptionStyles, { marginBottom: '24px' }],
  withoutPadding: [baseDescriptionStyles, { marginBottom: '0px' }],
});

export const linkStyles = style({
  display: 'inline-block',
});

export const buttonContainerStyles = style({
  display: 'flex',
  gap: '8px',
  marginTop: '16px',
  marginBottom: '24px',
  selectors: {
    [`${cardStyles.vertical} > &`]: {
      flexDirection: 'column-reverse',
      width: '100%',
    },
    [`${cardStyles.horizontal} &`]: {
      flexDirection: 'row',
    },
  },
});

export const imageContainerStyles = style({
  marginBottom: '20px',
  display: 'block',
  height: '120px',
  width: '120px',
  position: 'relative',
});

export const placeholderStyles = style({
  position: 'absolute',
  top: 0,
});

export const imageStyles = style({
  objectFit: 'contain',
  width: 'inherit',
  height: 'inherit',
});

export const closeButton = style({
  position: 'absolute',
  right: '12px',
  top: '12px',
  fontSize: '24px',
});
