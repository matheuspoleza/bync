import { useCallback, useMemo, useState } from 'react';

import { TextArea } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import { Box } from '@/components/Utility';

import { FieldLabel } from '../../../components/FieldLabel';
import { useMockImport } from '../../../hooks/useMockImport';
import { FolderSelect } from '../components/FolderSelect';
import { RefreshRateSelect } from '../components/RefreshRateSelect';
import { isURLValid } from '../utils/isUrlValid';
import { submitButtonStyles, textareaStyles } from './ImportFromURLModal.css';

interface IImportFromURLModal {
  defaultUrls?: string;
  onClose: VoidFunction;
}

export const ImportFromURLModal: React.FC<IImportFromURLModal> = ({ defaultUrls, onClose }) => {
  const { isUploading, onImport } = useMockImport(() => onClose?.());
  const [urls, setUrls] = useState<string>(defaultUrls ?? '');

  const [sumbissionError, setSubmissionError] = useState<boolean>(false);

  const caption = useMemo(() => {
    if (sumbissionError && !isUploading) return 'Invalid URLs.';
    const count = urls.split('\n').filter((line) => line.trim().length !== 0).length;
    if (!count) return 'One url per line.';
    const urlSuffix = count > 1 ? 'URLs' : 'URL';
    return `${count} ${urlSuffix} added.`;
  }, [sumbissionError, urls, isUploading]);

  const onURLValueChange = useCallback(() => {
    const urlArray = urls.split('\n');

    if (urlArray.length) {
      const isInvalid = urlArray.some((url) => !isURLValid(url));
      setSubmissionError(isInvalid);

      if (!isInvalid && urls) {
        onImport();
      }
    }
  }, [setSubmissionError, sumbissionError, urls]);

  const onSubmit = () => {
    onURLValueChange();
  };

  return (
    <Modal.Container>
      <Modal.Header title="Import from URL(s)" onClose={() => onClose?.()} />
      <Box mt={20} mx={24} mb={24} direction="column" gap={16}>
        <div>
          <FieldLabel>URL(s)</FieldLabel>
          <TextArea.AutoSize
            isFocused
            placeholder="Enter URL(s)"
            error={isUploading ? false : sumbissionError}
            value={urls}
            onFocus={() => setSubmissionError(false)}
            onValueChange={(value) => {
              setUrls(value);
              if (sumbissionError) {
                setSubmissionError(false);
              }
            }}
            disabled={isUploading}
            className={textareaStyles}
            caption={caption}
          />
        </div>
        <RefreshRateSelect isDisabled={isUploading} />
        <FolderSelect isDisabled={isUploading} />
      </Box>
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={() => onClose?.()} />
        <Modal.Footer.Button
          label={isUploading ? '' : 'Import'}
          isLoading={isUploading}
          disabled={isUploading}
          className={submitButtonStyles}
          onClick={onSubmit}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
