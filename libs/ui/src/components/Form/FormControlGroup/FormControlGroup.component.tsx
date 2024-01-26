import { Text } from '@/components/Text';

import { containerStyles, groupLabelStyles } from './FormControlGroup.css';
import type { IFormControlGroup } from './types';

export const FormControlGroup: React.FC<IFormControlGroup> = ({
  layout = 'horizontal',
  label,
  className,
  testID,
  children,
  id,
}) => {
  return (
    <section id={id} data-testid={testID} className={className}>
      <Text variant="fieldLabel" className={groupLabelStyles}>
        {label}
      </Text>
      <div className={containerStyles[layout]}>{children}</div>
    </section>
  );
};
