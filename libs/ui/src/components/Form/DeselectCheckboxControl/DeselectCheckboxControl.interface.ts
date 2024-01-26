import type { FormControlProps } from '@/types';

import type { ICheckbox } from '../CheckboxControl/Checkbox';

export type DeselectCheckboxControlState = 'unchecked' | 'checked' | 'deselect';

export interface IDeselectCheckboxControl
  extends FormControlProps<DeselectCheckboxControlState>,
    Omit<ICheckbox, keyof FormControlProps<boolean>> {}
