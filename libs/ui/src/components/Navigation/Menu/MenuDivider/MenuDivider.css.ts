import { recipe } from '@bync/style';

export const dividerContainer = recipe({
  base: {
    width: '100%',
    padding: '4px 0',
  },
  variants: {
    fullWidth: {
      false: {
        paddingLeft: '20px',
      },
      true: {
        paddingLeft: '0',
        paddingRight: '0',
      },
    },
    label: {
      true: {
        paddingTop: '8px',
        paddingBottom: '4px',
        paddingRight: '0px',
      },
    },
  },
});
