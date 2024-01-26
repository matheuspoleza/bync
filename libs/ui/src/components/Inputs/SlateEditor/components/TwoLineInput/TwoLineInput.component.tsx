import { Box } from '@/components/Utility/Box';

import { SlateEditor } from '../../SlateEditor.component';
import { containerStyle, lineOneStyles, lineTwoBaseStyles } from './TwoLineinput.css';
import type { ISlateEditorTwoLineInput } from './types';

export const SlateEditorTwoLineInput: React.FC<ISlateEditorTwoLineInput> = ({ lineOne, lineTwo, testID }) => {
  return (
    <Box direction="column" className={containerStyle} testID={testID}>
      <SlateEditor className={lineOneStyles} {...lineOne} />
      <SlateEditor className={lineTwoBaseStyles} {...lineTwo} />
    </Box>
  );
};
