import type { IconName } from '@bync/icons';
import * as Icons from '@bync/icons';
import type { SVGProps } from 'react';

import type { BaseProps } from '@/types';

export interface IIcon extends BaseProps, SVGProps<SVGSVGElement> {
  name: IconName;
}

export const Icon: React.FC<IIcon> = ({ name, testID, ...props }) => {
  const IconToDisplay = name && Icons[name];

  return <IconToDisplay data-testid={testID} {...props} />;
};
