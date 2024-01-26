import { recipe, style, styleVariants } from '@bync/style';

import { chunkStyles as baseStyles, textAreaBaseStyle } from '@/components/Inputs/TextArea/TextArea.css';

export const chunkStyles = style([textAreaBaseStyle, baseStyles]);
export const linkStyles = style({
  marginBottom: 4,
  width: '100%',
});

const withHeaderStyle = styleVariants({
  true: {
    padding: '9px 16px 7px',
    cursor: 'default',
  },
});

export const chunkRecipe = recipe({
  base: [textAreaBaseStyle, baseStyles],
  variants: {
    withHeader: withHeaderStyle,
  },
});

export const contentRecipe = recipe({
  variants: {
    withHeader: { true: { cursor: 'text' }, false: { cursor: 'not-allowed' } },
  },
});
