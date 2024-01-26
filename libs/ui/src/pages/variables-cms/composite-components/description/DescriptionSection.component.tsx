import { Box, InputFormControl, TextArea } from '@/components';

interface IVariableDescriptionSection {
  label?: string;
  errorMessage?: string;
  value: string;
  setValue: (description: string) => void;
}

const TEST_ID = 'variable__description';

export const VariableDescriptionSection: React.FC<IVariableDescriptionSection> = ({
  label,
  errorMessage,
  value,
  setValue,
}) => {
  return (
    <Box pb={16} px={24} direction="column">
      <InputFormControl label={label} errorMessage={errorMessage}>
        <TextArea
          value={value}
          onValueChange={setValue}
          minRows={1}
          maxRows={17}
          placeholder="Enter intent description"
          label="Description"
          testID={TEST_ID}
        />
      </InputFormControl>
    </Box>
  );
};
