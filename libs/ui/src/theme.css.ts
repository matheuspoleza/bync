import { createGlobalTheme, createTheme } from '@bync/style';

import { Theme } from './styles';

createGlobalTheme(':root', Theme.vars, Theme.theme);

export const light = createTheme(Theme.vars, Theme.theme);
export const dark = createTheme(Theme.vars, Theme.theme);
