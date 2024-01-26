import { recipe } from '@/main';

export const complex = recipe({
  base: {
    border: '1px dashed black',
  },
  variants: {
    color: {
      ok: { backgroundColor: 'cyan' },
      warn: { backgroundColor: 'orange' },
    },
    fontSize: {
      sm: { fontSize: 10 },
      md: { fontSize: 14 },
      lg: { fontSize: 18 },
    },
  },

  defaultVariants: {
    fontSize: 'lg',
  },
});
