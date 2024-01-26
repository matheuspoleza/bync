import { TextField } from '@/components';
import { Box } from '@/components/Utility/Box/Box.component';

interface IVariableNameSection {
  value: string;
  setValue?: (value: string) => void;
  errorMessage?: string;
}

const TEST_ID = 'variable__name';

export const VariableNameSection: React.FC<IVariableNameSection> = ({ value, setValue, errorMessage }) => {
  return (
    <Box pt={20} pb={16} px={24} direction="column">
      <TextField
        value={value}
        onValueChange={setValue}
        placeholder="Enter intent name"
        label="Name"
        errorMessage={errorMessage}
        testID={TEST_ID}
      />
    </Box>
  );
};
