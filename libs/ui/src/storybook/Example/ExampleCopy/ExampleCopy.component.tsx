import type { ISquareButton } from '@/components';
import { SquareButton } from '@/components';
import { notify } from '@/storybook/Notification';

import { generateExample } from './utils';

export interface IExampleCopy extends Pick<ISquareButton, 'variant'> {
  componentName: string;
  details: Record<string, any>;
}

export const ExampleCopy: React.FC<IExampleCopy> = ({ componentName, details, variant }) => {
  const clickHandler = async () => {
    await navigator.clipboard.writeText(generateExample(componentName, details));
    notify('Example was copied to clipboard 🔥');
  };

  return <SquareButton size="medium" iconName="Copy" variant={variant} onClick={clickHandler} />;
};
