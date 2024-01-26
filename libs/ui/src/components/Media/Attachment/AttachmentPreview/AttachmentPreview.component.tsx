import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';

import { hoverIconStyles, iconStyles, previewStyles } from './AttachmentPreview.css';
import type { IAttachmentPreview } from './types';

export const AttachmentPreview: React.FC<IAttachmentPreview> = ({ icon, hoverIcon, testID, className, onClick }) => {
  return (
    <button type="button" className={clsx(previewStyles, className)} data-testid={testID} onClick={onClick}>
      {hoverIcon && <Icon name={hoverIcon} className={hoverIconStyles} />}
      <Icon name={icon} className={iconStyles} width={24} height={24} />
    </button>
  );
};
