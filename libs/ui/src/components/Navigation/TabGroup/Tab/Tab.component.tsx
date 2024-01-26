/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import * as Icons from '@bync/icons';
import { clsx } from '@bync/style';

import { Text } from '@/components/Text';

import { CounterIndicator } from '../CounterIndicator';
import { iconVariants, tabContainerVariants, textStyles } from './Tab.css';
import type { ITab } from './types';

export const Tab: React.FC<ITab> = ({
  label,
  children,
  index,
  counter,
  iconName,
  isActive,
  onChange,
  width = 'hug',
  testID,
  className,
}) => {
  const textStyle = textStyles({ isActive });

  const handleChange = () => {
    onChange?.(index);
  };

  const IconToDisplay = iconName && Icons[iconName];

  const tabStyles = tabContainerVariants[width];

  return (
    <div className={clsx(tabStyles, className)} onClick={handleChange} data-testid={testID}>
      <Text variant="caption" weight="semiBold" className={textStyle}>
        {label}
      </Text>
      {children}
      {IconToDisplay && (
        <IconToDisplay viewBox="4 4 16 16" className={iconVariants[isActive ? 'isActive' : 'default']} />
      )}
      {counter && <CounterIndicator count={counter} />}
    </div>
  );
};
