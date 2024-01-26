import { clsx } from '@bync/style';

import { imageStyles } from './AttachmentImage.css';
import type { IAttachmentImage } from './types';

export const AttachmentImage: React.FC<IAttachmentImage> = ({ testID, className, alt = 'image', ...props }) => (
  <img {...props} data-testid={testID} alt={alt} className={clsx(imageStyles, className)} />
);
