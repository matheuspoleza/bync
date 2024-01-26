import { Text } from '@/components/Text/Text.component';
import type { IText } from '@/components/Text/types';

import { captionStyles } from './SectionHeaderCaption.css';

export const SectionHeaderCaption: React.FC<IText> = ({ children, testID, ...props }) => {
  return (
    <Text {...props} variant="caption" className={captionStyles} testID={`${testID}--section-header-caption`}>
      {children}
    </Text>
  );
};
