import { clsx } from '@bync/style';
import React from 'react';

import { Icon } from '@/components/Media/Icon';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Tooltip } from '@/components/Utility/Tooltip/Tooltip.component';
import { forwardRef } from '@/hocs';
import { useTooltipModifiers } from '@/hooks/tooltip.hook';

import {
  arrowStyle,
  buttonStyle,
  editorButtonContainer,
  iconContainer,
  iconStyles,
  labelStyle,
  secondLabelStyle,
  toggleButtonStyles,
  tooltipArrowStyles,
  tooltipModifier,
  warningIcon,
} from './EditorButton.css';
import type { IEditorButton } from './types';

export const EditorButton = forwardRef<HTMLButtonElement, IEditorButton>('EditorButton')(
  (
    {
      label,
      secondLabel,
      caption,
      prefixIconName,
      isEmpty,
      isActive = false,
      isHovering = false,
      onClick,
      isWarning,
      warningTooltipContent,
      suffixButtons,
      toggle,
      disabled,
      testID,
      fullWidth = false,
      buttonClassName: customButtonClassName,
    },
    ref
  ) => {
    const buttonClassName = buttonStyle({ isEmpty, hasCaption: !!caption, isActive, isHovering });
    const iconClassName = iconStyles({ isEmpty });
    let toggleElement;
    if (toggle) {
      toggleElement = React.cloneElement(toggle, { disabled });
    }

    const alignment = caption ? 'start' : 'center';

    const tooltipModifiers = useTooltipModifiers([{ name: 'offset', options: { offset: [0, -2] } }]);

    return (
      <Box
        className={editorButtonContainer({ fullWidth, hasCaption: !!caption })}
        justify="space-between"
        align="center"
      >
        <button
          ref={ref}
          className={clsx(buttonClassName, customButtonClassName)}
          disabled={disabled}
          data-testid={testID}
          onClick={onClick}
        >
          <Box justify="space-between" align={alignment}>
            <Box align={alignment} overflow="hidden">
              {prefixIconName && (
                <span className={iconContainer({ hasCaption: !!caption })}>
                  <Icon name={prefixIconName} className={iconClassName} />
                </span>
              )}

              <Box
                mt={caption ? 0 : 2}
                pl={prefixIconName ? 0 : 8}
                align={alignment}
                shrink={secondLabel ? 0 : 1}
                maxWidth={secondLabel ? '75px' : '100%'}
                justify="start"
                overflow="hidden"
                direction="column"
              >
                <Text overflow className={labelStyle}>
                  {label}
                </Text>

                {caption && <Text variant="caption">{caption}</Text>}
              </Box>

              {secondLabel && (
                <Box minWidth="0px" overflow="hidden">
                  <Icon name="ArrowRight" className={arrowStyle} height={24} width={24} />

                  <Text overflow className={secondLabelStyle}>
                    {secondLabel}
                  </Text>
                </Box>
              )}
            </Box>

            {isWarning && (
              <Tooltip
                hasArrow={true}
                placement="top"
                className={tooltipModifier}
                modifiers={tooltipModifiers}
                tooltipClassName={tooltipArrowStyles}
                referenceElement={({ onOpen, onClose, ref }) => (
                  <span
                    ref={ref}
                    className={iconContainer({ warning: true })}
                    onMouseEnter={warningTooltipContent ? onOpen : undefined}
                    onMouseLeave={onClose}
                  >
                    <Icon name="Warning" height={24} width={24} className={warningIcon} />
                  </span>
                )}
              >
                {() => <Text variant="caption">{warningTooltipContent}</Text>}
              </Tooltip>
            )}
          </Box>
        </button>

        {suffixButtons?.map((button) => button)}

        {toggleElement && <span className={toggleButtonStyles}>{toggleElement}</span>}
      </Box>
    );
  }
);
