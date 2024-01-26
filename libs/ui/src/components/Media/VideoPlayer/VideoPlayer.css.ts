import { recipe, style } from '@bync/style';

export const videoRecipe = recipe({
  base: {
    height: '100%',
    width: '100%',
  },
  variants: {
    cover: {
      true: { objectFit: 'cover' },
    },
  },
});

export const loaderStyles = style({
  display: 'flex',
  position: 'absolute',
  top: 0,
});

export const videoContainerStyles = style({
  position: 'relative',
});
