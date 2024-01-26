import type { IAttachmentContainer } from '../AttachmentContainer';
import type { ImageAttachment } from '../types';

export interface IImageAttachment extends IAttachmentContainer {
  attachment: ImageAttachment;
}
