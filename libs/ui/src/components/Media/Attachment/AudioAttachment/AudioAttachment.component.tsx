import { useMemo } from 'react';
import { match, P } from 'ts-pattern';

import { ProgressBar } from '@/components/Feedback/ProgressBar';
import { Box } from '@/components/Utility/Box';
import { useAudioFormattedDuration, useAudioManager } from '@/hooks/audio.hook';

import { AttachmentCaption as Caption } from '../AttachmentCaption';
import { AttachmentContainer as Container } from '../AttachmentContainer';
import { AttachmentPreview as Preview } from '../AttachmentPreview';
import { AttachmentTitle as Title } from '../AttachmentTitle';
import { NotPreviewable } from '../NotPreviewable';
import { PreviewLoading } from '../PreviewLoading';
import { hasVariables } from '../utils';
import { progressBarStyles, progressBarTrackStyles } from './AudioAttachment.css';
import type { IAudioAttachment } from './types';

export const AudioAttachment: React.FC<IAudioAttachment> = ({ testID, disabled, attachment, ...props }) => {
  const withVariables = useMemo(() => !!attachment.src && hasVariables(attachment.src), [attachment.src]);

  const audioManager = useAudioManager({ src: withVariables ? undefined : attachment.src });
  const formattedDuration = useAudioFormattedDuration(audioManager.duration);

  const onPlayPauseClick = () => {
    if (withVariables) return;

    if (audioManager.playing) {
      audioManager.stop();
    } else {
      audioManager.play();
    }
  };

  const { caption, preview } = match(attachment.src)
    .with(P.nullish, () => ({
      caption: <Caption testID={`${testID}--caption`}>Uploading...</Caption>,
      preview: <PreviewLoading testID={`${testID}--spinner`} />,
    }))
    .with(P.when(hasVariables), () => ({
      caption: <Caption testID={`${testID}--caption`}>Includes variable, no preview</Caption>,
      preview: <NotPreviewable testID={`${testID}--not-previewable`} />,
    }))
    .with(P.string, () => ({
      caption: (
        <>
          <Caption testID={`${testID}--caption`}>{formattedDuration}</Caption>
          <ProgressBar
            value={audioManager.progress}
            testID={`${testID}--progress-bar`}
            className={progressBarTrackStyles}
            barClassName={progressBarStyles}
          />
        </>
      ),
      preview: (
        <Preview
          icon={audioManager.playing ? 'Stop' : 'Audio'}
          testID={`${testID}--preview`}
          onClick={onPlayPauseClick}
          hoverIcon={audioManager.playing ? 'Stop' : 'PlayS'}
        />
      ),
    }))
    .exhaustive();

  return (
    <Container {...props} testID={testID} disabled={disabled || !attachment.src}>
      {preview}
      <Box grow={1} direction="column" overflow="hidden">
        <Title testID={`${testID}--title`}>{attachment.title}</Title>
        <Box gap={8} align="center" grow={1}>
          {caption}
        </Box>
      </Box>
    </Container>
  );
};
