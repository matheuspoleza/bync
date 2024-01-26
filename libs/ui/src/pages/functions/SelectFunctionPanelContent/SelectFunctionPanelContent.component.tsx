import { Box, Button, Divider } from '@/components';

import { SelectFunctionDropdown } from '../SelectFunctionDropdown/SelectFunctionDropdown.component';

export const SelectFunctionPanelContent = () => {
  return (
    <>
      <Box justify="center" align="center" pt={20} px={24} direction="column">
        <SelectFunctionDropdown />
      </Box>
      <Box py={12} px={24}>
        <Divider label="Or" centeredLabel={true} noPadding={true} />
      </Box>
      <Box px={24} justify="center">
        <Button label="Create function" fullWidth={true} />
      </Box>
      <Box pt={20}>
        <Divider noPadding={true} />
      </Box>
    </>
  );
};
