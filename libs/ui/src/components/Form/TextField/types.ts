import type { IInput } from '../../Inputs/Input';
import type { IInputFormControl } from '../InputFormControl';

export interface ITextField extends IInput, Omit<IInputFormControl, 'children'> {}
