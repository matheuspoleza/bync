import { clsx } from '@bync/style';

import { Text } from '@/components/Text/Text.component';

import { attachmentCaptionStyles } from './AttachmentCaption.css';
import type { IAttachmentCaption } from './types';

export const AttachmentCaption: React.FC<IAttachmentCaption> = ({ children, className, testID, style, overflow }) => {
  return (
    <Text
      style={style}
      testID={testID}
      variant="caption"
      overflow={overflow}
      className={clsx(attachmentCaptionStyles, className)}
    >
      {children}
    </Text>
  );
};
