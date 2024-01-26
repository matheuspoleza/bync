import { Checkbox as CheckboxComponent } from './Checkbox.component';
import * as styled from './Checkbox.styled';
import * as css from './styles';

export type { ICheckbox } from './Checkbox.component';

export const Checkbox = Object.assign(CheckboxComponent, styled, { css });
