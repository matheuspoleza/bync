import { forwardRef } from '@/hocs';
import { useExternalID } from '@/hooks';

import { Input } from '../../Inputs/Input';
import { InputFormControl } from '../InputFormControl';
import type { ITextField } from './types';

export const TextField = forwardRef<HTMLInputElement, ITextField>('TextField')(
  ({ label, caption, errorMessage, onKeyDown, ...props }: ITextField, ref) => {
    // do checks on the variants here, disallow certain variants
    const id = useExternalID(props.id);
    const error = props.error || !!errorMessage;

    return (
      <InputFormControl id={id} label={label} caption={caption} errorMessage={errorMessage}>
        <Input {...props} onKeyDown={onKeyDown} ref={ref} id={id} error={error} />
      </InputFormControl>
    );
  }
);
