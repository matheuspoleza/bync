import { match, P } from 'ts-pattern';

import { AttachmentImage } from '@/components/Media/Attachment/AttachmentImage';
import { Box } from '@/components/Utility/Box/Box.component';

import { AttachmentCaption as Caption } from '../AttachmentCaption';
import { AttachmentContainer as Container } from '../AttachmentContainer';
import { AttachmentTitle as Title } from '../AttachmentTitle';
import { NotPreviewable } from '../NotPreviewable';
import { PreviewLoading } from '../PreviewLoading';
import { hasVariables } from '../utils';
import type { IImageAttachment } from './types';

export const ImageAttachment: React.FC<IImageAttachment> = ({ testID, attachment, ...props }) => {
  const { caption, preview } = match(attachment.src)
    .with(P.nullish, () => ({
      caption: 'Uploading...',
      preview: <PreviewLoading testID={`${testID}--spinner`} />,
    }))
    .with(P.when(hasVariables), () => ({
      caption: 'Includes variable, no preview',
      preview: <NotPreviewable testID={`${testID}--not-previewable`} />,
    }))
    .with(P.string, (src) => ({
      caption: attachment.filename,
      preview: <AttachmentImage testID={`${testID}--image`} src={src} />,
    }))
    .exhaustive();

  return (
    <Container {...props} testID={testID}>
      {preview}
      <Box direction="column" overflow="hidden">
        <Title testID={`${testID}--title`}>Image</Title>
        <Caption testID={`${testID}--caption`} overflow>
          {caption}
        </Caption>
      </Box>
    </Container>
  );
};
