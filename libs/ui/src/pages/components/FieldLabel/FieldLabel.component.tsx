import type { IText } from '@/components/Text';
import { Text } from '@/components/Text';

import { labelStyles } from './FieldLabel.css';

export const FieldLabel: React.FC<IText> = ({ children, ...props }) => {
  return (
    <Text {...props} variant="fieldLabel" className={labelStyles}>
      {children}
    </Text>
  );
};
