import { recipe } from '@bync/style';

export const variableStyle = recipe({
  base: {
    cursor: 'pointer',
    display: 'inline-flex',
    verticalAlign: 'middle',
    userSelect: 'none',
    margin: '0 2px',
  },

  variants: {
    preview: {
      true: {
        userSelect: 'auto',
      },
    },
  },
});
