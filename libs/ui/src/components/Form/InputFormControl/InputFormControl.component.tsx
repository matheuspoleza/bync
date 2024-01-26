import { Text } from '@/components/Text';

import { labelContainer, labelStyles } from './InputFormControl.css';
import type { IInputFormControl } from './types';

export const InputFormControl: React.FC<IInputFormControl> = ({
  label,
  caption,
  errorMessage,
  children,
  id,
  testID,
}) => {
  const captionElement = () => {
    if (!caption) return null;
    return typeof caption === 'string' ? (
      <Text className={labelStyles.caption} variant="fieldCaption" testID={`${testID}--caption`}>
        {caption}
      </Text>
    ) : (
      caption
    );
  };

  return (
    <>
      {label && (
        <label className={labelContainer} htmlFor={id}>
          <Text className={labelStyles.base} variant="fieldLabel" testID={`${testID}--label`}>
            {label}
          </Text>
        </label>
      )}
      {children}
      {errorMessage && (
        <Text className={labelStyles.error} variant="fieldCaption" testID={`${testID}--error-message`}>
          {errorMessage}
        </Text>
      )}
      {captionElement()}
    </>
  );
};
