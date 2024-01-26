import { useCallback, useEffect, useMemo, useState } from 'react';

import { TextArea } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import { Box } from '@/components/Utility';

import { FieldLabel } from '../../../components/FieldLabel';
import { useMockImport } from '../../../hooks/useMockImport';
import { FolderSelect } from '../components/FolderSelect';
import { submitButtonStyles, textStyles } from './ImportPlainTextModal.css';

export interface IImportPlainTextModal {
  defaultText?: string;
  onClose: VoidFunction;
}

export const ImportPlainTextModal: React.FC<IImportPlainTextModal> = ({ defaultText, onClose }) => {
  const [textContent, setTextContent] = useState<string>(defaultText ?? '');
  const [sumbissionError, setSubmissionError] = useState<boolean>(false);
  const isTextEmpty = useMemo(() => textContent.length === 0, [textContent]);

  const onSubmit = useCallback(() => {
    if (isTextEmpty) {
      setSubmissionError(true);
    } else {
      onImport();
    }
  }, [isTextEmpty, textContent]);

  useEffect(() => {
    if (textContent.length > 0) setSubmissionError(false);
  }, [textContent.length]);

  const { isUploading, onImport } = useMockImport(() => onClose());

  return (
    <Modal.Container>
      <Modal.Header title="Import text" onClose={onClose} />
      <Box pt={20} pb={24} px={24} direction="column" gap={16}>
        <div>
          <FieldLabel>Content</FieldLabel>
          <TextArea.AutoSize
            isFocused
            placeholder="Enter or paste text here..."
            error={isUploading ? false : sumbissionError}
            value={textContent}
            onFocus={() => setSubmissionError(false)}
            onValueChange={(text) => setTextContent(text)}
            disabled={isUploading}
            className={textStyles}
            caption={sumbissionError ? 'Text is required.' : ''}
          />
        </div>

        <FolderSelect isDisabled={isUploading} />
      </Box>
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={onClose} />
        <Modal.Footer.Button
          label={isUploading ? '' : 'Import'}
          disabled={isUploading}
          onClick={onSubmit}
          isLoading={isUploading}
          className={submitButtonStyles}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
