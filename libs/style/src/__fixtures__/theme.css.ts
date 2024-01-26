import { createTheme } from '@/main';

export const spacing = {
  sm: '2px',
  md: '4px',
  lg: '8px',
};

export const [light, vars] = createTheme({
  color: {
    brand: 'red',
  },
  spacing,
});

export const dark = createTheme(vars, {
  color: {
    brand: 'blue',
  },
  spacing,
});
