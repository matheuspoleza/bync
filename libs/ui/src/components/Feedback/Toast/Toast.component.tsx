import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { LoadingSpinner } from '@/components/Other/LoadingSpinner';

import { Button } from '../../Buttons/Button/Button.component';
import { Text } from '../../Text';
import { Box } from '../../Utility/Box/Box.component';
import {
  actionButtonButtonStyles,
  baseStyles,
  closeButtonStyles,
  contentStyles,
  loadingSpinnerContainer,
  loadingSpinnerStyles,
  toastIconStyle,
  toastTextStyle,
} from './Toast.css';
import * as ToastTheme from './ToastTheme.css';
import type { IToast } from './types';

export const buttonVariant = {
  default: 'themedDefault',
  alert: 'themedAlert',
  success: 'themedSuccess',
} as const;

const toastThemeByVariant = {
  default: 'themedDefault',
  alert: 'themedAlert',
  success: 'themedSuccess',
} as const;

const iconNamesByVariant = {
  default: 'UrlS',
  alert: 'Warning',
  success: 'Checkmark',
} as const;

export const Toast: React.FC<IToast> = ({
  id,
  text,
  style,
  testID,
  onClose,
  variant = 'default',
  showIcon = true,
  className,
  isClosable = false,
  actionButtonProps,
  isLoading,
}) => {
  const showCloseButton = isClosable && onClose;
  const showButtons = Boolean(actionButtonProps || showCloseButton);
  const textElement = typeof text === 'string' ? <Text className={toastTextStyle}>{text}</Text> : text;

  return (
    <div
      className={clsx(baseStyles, ToastTheme[toastThemeByVariant[variant]], className)}
      style={style}
      data-testid={testID}
      id={id}
    >
      <div
        className={contentStyles}
        style={{
          paddingLeft: showIcon || isLoading ? 12 : 16,
          paddingRight: showButtons ? 2 : 16,
        }}
      >
        {showIcon && !isLoading && (
          <Icon
            name={iconNamesByVariant[variant]}
            className={toastIconStyle}
            width="24px"
            height="24px"
            data-testid={`${testID}--icon`}
          />
        )}
        {isLoading && (
          <div className={loadingSpinnerContainer}>
            <LoadingSpinner className={loadingSpinnerStyles} variant="light" size="medium" />
          </div>
        )}
        {textElement}
        {showButtons && (
          <Box gap={4} ml={16}>
            {actionButtonProps && (
              <Button
                variant={buttonVariant[variant]}
                disabled={isLoading}
                className={actionButtonButtonStyles}
                {...actionButtonProps}
                size="medium"
                testID={`${testID}--action-button`}
              />
            )}
            {showCloseButton && (
              <Button
                iconName="CloseM"
                className={closeButtonStyles}
                variant={buttonVariant[variant]}
                onClick={onClose}
                size="medium"
                testID={`${testID}--close-button`}
              />
            )}
          </Box>
        )}
      </div>
    </div>
  );
};
