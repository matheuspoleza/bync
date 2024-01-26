import { Input as InputComponent } from './Input.component';
import * as css from './styles/Input.css';
import * as Theme from './styles/InputTheme.css';
import { TwoLineInput } from './TwoLineInput';

export type { ISearchInput } from './Search';
export { SearchInput } from './Search';
export type { ITwoLineInput } from './TwoLineInput/types';
export type { IInput } from './types';

export const Input = Object.assign(InputComponent, { css, Theme, TwoLine: TwoLineInput });
