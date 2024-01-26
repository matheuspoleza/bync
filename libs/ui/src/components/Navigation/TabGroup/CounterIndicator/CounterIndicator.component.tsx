import { Text } from '@/components/Text';

import { containerStyles, styles } from './CounterIndicator.css';

interface ICounterIndicator {
  count: number;
}

export const CounterIndicator: React.FC<ICounterIndicator> = ({ count }) => {
  return (
    <div className={containerStyles}>
      <Text variant="caption" className={styles}>
        {count}
      </Text>
    </div>
  );
};
