import { clsx } from '@bync/style';

import type { BaseProps } from '@/types';

import { Text } from '../../Text/Text.component';
import { captionStyles, containerStyles, labelStyles, labelTextStyles } from './FormControlLabel.css';

export interface IFormControlLabel extends BaseProps {
  id: string;
  label?: string;
  caption?: string;
  disabled?: boolean;
  className?: string;
  children: JSX.Element;
}

export const FormControlLabel: React.FC<IFormControlLabel> = ({
  id,
  label,
  caption,
  disabled,
  children,
  className,
  testID,
}) => {
  return (
    <label htmlFor={id} className={clsx(containerStyles[disabled ? 'disabled' : 'enabled'], className)}>
      <div className={labelStyles}>
        {children}
        {label && (
          <Text variant="basic" weight="regular" className={labelTextStyles} testID={`${testID}--label`}>
            {label}
          </Text>
        )}
      </div>
      {caption && (
        <small className={captionStyles} data-testid={`${testID}--caption`}>
          {caption}
        </small>
      )}
    </label>
  );
};
