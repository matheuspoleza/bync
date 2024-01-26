import { useState } from 'react';

import { TextArea } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import { Box } from '@/components/Utility';

import { FieldLabel } from '../../../components/FieldLabel';
import { useMockImport } from '../../../hooks/useMockImport';
import { isMultiURLInputValid } from '../utils/isUrlValid';
import { importButtonStyles, textareaStyles } from './ReviewURLsModal.css';

const MOCK_URLS = 'https://voiceflow.com/\nhttp://voiceflow.com/about\n';

interface IReviewURLsModal {
  onClose?: VoidFunction;
  onBackClick?: VoidFunction;
}

export const ReviewURLsModal: React.FC<IReviewURLsModal> = ({ onClose, onBackClick }) => {
  const { isUploading, onImport } = useMockImport(() => onClose?.());

  const [urls, setUrls] = useState(MOCK_URLS.repeat(15));
  const [submissionError, setSubmissionError] = useState<boolean>(false);

  const onSubmit = () => {
    setSubmissionError(false);
    return isMultiURLInputValid(urls) ? onImport() : setSubmissionError(true);
  };

  return (
    <Modal.Container>
      <Modal.Header
        title="Review & confirm URLs"
        onClose={() => onClose?.()}
        leftButton={<Modal.Header.LeftButton iconName="ArrowLeft" onClick={() => onBackClick?.()} />}
      />
      <Box mt={20} mb={24} mx={24} direction="column">
        <FieldLabel>URL(s)</FieldLabel>
        <TextArea.AutoSize
          isFocused
          className={textareaStyles}
          value={urls}
          onFocus={() => setSubmissionError(false)}
          onValueChange={setUrls}
          error={isUploading ? false : submissionError}
          disabled={isUploading}
          caption={
            submissionError
              ? 'Some of the URLs are invalid.'
              : `${urls.split('\n').filter((url) => url.trim().length !== 0).length} URLs added.`
          }
        />
      </Box>
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={() => onClose?.()} />
        <Modal.Footer.Button
          label={isUploading ? '' : `Import ${urls.split('\n').filter((url) => url.trim().length !== 0).length} URLs`}
          isLoading={isUploading}
          disabled={isUploading}
          className={importButtonStyles}
          onClick={onSubmit}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
