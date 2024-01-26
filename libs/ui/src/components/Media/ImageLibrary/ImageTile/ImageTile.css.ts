import { recipe, style } from '@bync/style';

import { colors } from '@/styles/theme';

export const imageStyle = style({
  cursor: 'pointer',
  overflow: 'hidden',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  position: 'relative',
  zIndex: 1,
});

export const imageFileContainerStyle = recipe({
  base: {
    backgroundColor: colors.black[32],
    backdropFilter: 'blur(32px)',
    maxHeight: '100%',
    display: '-webkit-box',
    transform: 'translateY(100%)',
    transition: 'transform 0.12s ease-out',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    zIndex: 2,

    selectors: {
      [`${imageStyle}:hover > &`]: {
        transform: 'translateY(0)',
      },
    },
  },

  variants: {
    active: {
      true: {
        transform: 'translateY(0)',
      },
    },
  },
});

export const imageFileStyle = style({
  color: 'white',
  width: '100%',
  wordWrap: 'break-word',
  wordBreak: 'break-all',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
});
