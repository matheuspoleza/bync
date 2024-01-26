import { useExternalID } from '@/hooks';

import type { IFormControlLabel } from '../FormControlLabel';
import { FormControlLabel } from '../FormControlLabel';
import type { IRadio } from './Radio';
import { Radio } from './Radio';

export interface IRadioControl extends IRadio, Omit<IFormControlLabel, 'children' | 'id'> {}

export const RadioControl: React.FC<IRadioControl> = ({ label, caption, disabled, ...props }) => {
  const id = useExternalID(props.id);

  return (
    <FormControlLabel id={id} label={label} caption={caption} disabled={disabled}>
      <Radio {...props} id={id} disabled={disabled} />
    </FormControlLabel>
  );
};
