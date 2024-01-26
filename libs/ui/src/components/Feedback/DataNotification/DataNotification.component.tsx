import { clsx } from '@bync/style';
import React, { useEffect } from 'react';
import { useCollapse } from 'react-collapsed';

import { Button } from '@/components/Buttons/Button';
import { Gauge } from '@/components/Other/Gauge';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility';
import { getQualityLevel } from '@/utils/quality-level.util';

import {
  baseStyles,
  bodyStyles,
  buttonStyles,
  gaugeStyles,
  headerStyles,
  titleSecondaryStyles,
  titleStyles,
} from './DataNotification.css';
import * as DataNotificationTheme from './DataNotificationTheme.css';
import type { IDataNotification } from './types';

const dataNotificationThemeByVariant = {
  low: 'themedAlert',
  ok: 'themedDefault',
  good: 'themedSuccess',
  great: 'themedSuccess',
} as const;

const dataNotificationTypes = {
  clarity: 'Clarity',
  confidence: 'Confidence',
} as const;

export const DataNotification: React.FC<IDataNotification> = ({
  text,
  type = 'clarity',
  score = 85,
  level,
  testID,
  className,
  onButtonClick,
}) => {
  const variant = level || getQualityLevel(score);
  const isLow = variant === 'low';
  const delayRef = React.useRef<number>(0);

  const collapse = useCollapse({
    duration: 80,
    defaultExpanded: isLow,
  });

  const toggleProps = collapse.getToggleProps({ disabled: isLow });

  const onMouseEnter = () => {
    window.clearTimeout(delayRef.current);
    delayRef.current = window.setTimeout(() => collapse.setExpanded(true), 150);
  };

  const onMouseLeave = () => {
    window.clearTimeout(delayRef.current);
    collapse.setExpanded(false);
  };

  useEffect(() => () => clearTimeout(delayRef.current), []);

  return (
    <Box
      testID={testID}
      className={clsx(baseStyles, DataNotificationTheme[dataNotificationThemeByVariant[variant]], className)}
      direction="column"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Box
        {...toggleProps}
        as="header"
        px={24}
        align="center"
        testID={`${testID}--header`}
        justify="space-between"
        onClick={undefined}
        className={headerStyles}
        direction="row"
      >
        <Text className={titleStyles}>
          {dataNotificationTypes[type]}: {score} <span className={titleSecondaryStyles}>of 100 pts</span>
        </Text>

        <Gauge
          className={gaugeStyles}
          progress={score}
          level={variant}
          variant="notification"
          testID={`${testID}--gauge`}
        />
      </Box>

      <div {...collapse.getCollapseProps()}>
        <Box px={24} py={16} className={bodyStyles} direction="column">
          <Text>{text}</Text>

          {onButtonClick && (
            <Button
              className={buttonStyles}
              size="medium"
              label="View conflicts"
              variant="secondary"
              onClick={onButtonClick}
              testID={`${testID}--button`}
            />
          )}
        </Box>
      </div>
    </Box>
  );
};
