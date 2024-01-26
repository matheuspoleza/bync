/* eslint-disable jsx-a11y/no-autofocus */
import type { ITextField } from '@/components/Form/TextField';
import { TextField } from '@/components/Form/TextField';
import { Box } from '@/components/Utility/Box';

export interface IEntityNameField extends ITextField {}
export const EntityNameField: React.FC<IEntityNameField> = (props) => {
  return (
    <Box direction="column">
      <TextField {...props} autoFocus label="Name" placeholder="Enter entity name" />
    </Box>
  );
};
