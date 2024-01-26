import { AttachmentImage as ImageComponent } from './AttachmentImage.component';
import { AttachmentImagePlaceholder } from './AttachmentImagePlaceholder';

export * from './types';
export const AttachmentImage = Object.assign(ImageComponent, {
  displayName: 'AttachmentImage',
  Placeholder: AttachmentImagePlaceholder,
});
