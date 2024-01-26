import { Icon } from '@/components/Media/Icon';

import { notPreviewableStyles } from './NotPreviewable.css';

export const NotPreviewable: React.FC<{ testID?: string }> = ({ testID }) => (
  <div className={notPreviewableStyles} data-testid={testID}>
    <Icon name="Variable" height={24} width={24} />
  </div>
);
