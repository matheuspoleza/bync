import { Text } from '@/components/Text';

import { exampleLabelStyles } from './ExampleLabel.css';

export interface IExampleLabel extends React.PropsWithChildren {}

export const ExampleLabel: React.FC<IExampleLabel> = ({ children }) => (
  <Text variant="h4" className={exampleLabelStyles}>
    {children}
  </Text>
);
