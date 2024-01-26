import { useExternalID } from '@/hooks';

import type { IFormControlLabel } from '../FormControlLabel';
import { FormControlLabel } from '../FormControlLabel';
import type { ICheckbox } from './Checkbox';
import { Checkbox } from './Checkbox';

export interface ICheckboxControl extends ICheckbox, Omit<IFormControlLabel, 'children' | 'id'> {}

export const CheckboxControl: React.FC<ICheckboxControl> = ({ label, caption, disabled, ...props }) => {
  const id = useExternalID(props.id);

  return (
    <FormControlLabel id={id} label={label} caption={caption} disabled={disabled}>
      <Checkbox {...props} id={id} disabled={disabled} />
    </FormControlLabel>
  );
};
