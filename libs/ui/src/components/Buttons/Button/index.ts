import { Button as ButtonComponent } from './Button.component';
import * as css from './styles/Button.css';

export type { IButton } from './types';

export const Button = Object.assign(ButtonComponent, { css });
