import { clsx } from '@bync/style';

import { Text } from '@/components/Text/Text.component';

import { attachmentTitleStyles } from './AttachmentTitle.css';
import type { IAttachmentTitle } from './types';

export const AttachmentTitle: React.FC<IAttachmentTitle> = ({ children, className, testID, style }) => (
  <Text
    weight="semiBold"
    variant="caption"
    className={clsx(attachmentTitleStyles, className)}
    testID={testID}
    style={style}
  >
    {children}
  </Text>
);
