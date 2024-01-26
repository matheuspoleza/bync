import { globalStyle } from '@bync/style';

import { Theme } from './styles';

globalStyle('body', {
  color: Theme.vars.color.font.default,
  fontFamily: Theme.vars.font.family.default,
  MozOsxFontSmoothing: 'grayscale',
  WebkitFontSmoothing: 'antialiased',
});

globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
});
