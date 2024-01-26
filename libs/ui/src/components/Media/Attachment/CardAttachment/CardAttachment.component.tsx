import { useMemo } from 'react';
import { match, P } from 'ts-pattern';

import { Preview, StaticEditor } from '@/components/Inputs/SlateEditor';
import { AttachmentImage } from '@/components/Media/Attachment/AttachmentImage';
import { Box } from '@/components/Utility/Box/Box.component';

import { attachmentCaptionStyles } from '../AttachmentCaption/AttachmentCaption.css';
import { AttachmentContainer as Container } from '../AttachmentContainer';
import { attachmentTitleStyles } from '../AttachmentTitle/AttachmentTitle.css';
import { NotPreviewable } from '../NotPreviewable';
import { PreviewLoading } from '../PreviewLoading';
import { hasVariables } from '../utils';
import type { ICardAttachment } from './types';

export const CardAttachment: React.FC<ICardAttachment> = ({ testID, attachment, pluginsOptions, ...props }) => {
  const data = match(attachment)
    .with({ isUploading: P.when((isUploading) => isUploading) }, () => ({
      caption: StaticEditor.createTextState('Uploading...'),
      preview: <PreviewLoading testID={`${testID}--spinner`} />,
    }))
    .with({ src: P.nullish }, (attachment) => ({
      caption: attachment.description,
      preview: <AttachmentImage.Placeholder testID={`${testID}--spinner`} />,
    }))
    .with({ src: P.when((src) => src && hasVariables(src)) }, () => ({
      caption: StaticEditor.createTextState('Includes variable, no preview'),
      preview: <NotPreviewable testID={`${testID}--not-previewable`} />,
    }))
    .with({ src: P.string }, (attachment) => ({
      caption: attachment.description,
      preview: <AttachmentImage testID={`${testID}--image`} src={attachment.src} />,
    }))
    .exhaustive();

  const title = useMemo(
    () =>
      StaticEditor.isNewState(attachment.title) ? StaticEditor.createTextState('Untitled card') : attachment.title,
    [attachment.title]
  );

  const caption = useMemo(
    () => (StaticEditor.isNewState(data.caption) ? StaticEditor.createTextState('Enter description') : data.caption),
    [data.caption]
  );

  return (
    <Container {...props} testID={testID}>
      {data.preview}
      <Box direction="column" overflow="hidden">
        <Preview
          testID={`${testID}--title`}
          value={title}
          className={attachmentTitleStyles}
          pluginsOptions={pluginsOptions}
        />
        <Preview
          testID={`${testID}--caption`}
          value={caption}
          className={attachmentCaptionStyles}
          pluginsOptions={pluginsOptions}
        />
      </Box>
    </Container>
  );
};
