import { match } from 'ts-pattern';

import { AudioAttachment } from './AudioAttachment';
import { CardAttachment } from './CardAttachment';
import { ImageAttachment } from './ImageAttachment';
import type { IAttachment } from './types';

export const Attachment: React.FC<IAttachment> = ({ attachment, ...props }) => {
  return match(attachment)
    .with({ type: 'audio' }, (attachment) => <AudioAttachment {...props} attachment={attachment} />)
    .with({ type: 'image' }, (attachment) => <ImageAttachment {...props} attachment={attachment} />)
    .with({ type: 'card' }, (attachment) => <CardAttachment {...props} attachment={attachment} />)
    .exhaustive();
};
