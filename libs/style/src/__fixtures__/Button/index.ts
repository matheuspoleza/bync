import { Button as ButtonComponent } from './Button.component';
import * as css from './Button.css';
import * as styled from './Button.styled';

export type { ButtonProps } from './Button.component';

export const Button = Object.assign(ButtonComponent, styled, { css });
