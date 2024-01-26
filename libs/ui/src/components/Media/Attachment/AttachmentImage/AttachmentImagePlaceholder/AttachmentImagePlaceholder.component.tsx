import { clsx } from '@bync/style';

import { placeholderStyles } from './AttachmentImagePlaceholder.css';
import type { IImagePlaceholder } from './types';

export const AttachmentImagePlaceholder: React.FC<IImagePlaceholder> = ({ testID, ...props }) => (
  <div {...props} className={clsx(placeholderStyles, props)} data-testid={testID} />
);
