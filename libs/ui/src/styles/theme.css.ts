import { createGlobalTheme, createTheme } from '@bync/style';

import * as Theme from './theme.contract.css';

createGlobalTheme(':root', Theme.vars, Theme.theme);

export const light = createTheme(Theme.vars, Theme.theme);
export const dark = createTheme(Theme.vars, Theme.theme);
