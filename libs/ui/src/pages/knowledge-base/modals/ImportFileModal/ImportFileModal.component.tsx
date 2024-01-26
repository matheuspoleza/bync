import { useMemo, useState } from 'react';

import { UploadArea } from '@/components/Inputs';
import { Modal } from '@/components/Modal';
import { Box } from '@/components/Utility';

import { FieldLabel } from '../../../components/FieldLabel';
import { useMockImport } from '../../../hooks/useMockImport';
import { FolderSelect } from '../components/FolderSelect';
import { submitButtonStyles, uploadAreaStyles } from './ImportFileModal.css';

export const ImportFileModal: React.FC<any> = ({ onClose }) => {
  const [file, setFile] = useState<File[] | undefined>(undefined);

  const { isUploading, onImport } = useMockImport(() => onClose());
  const [sumbissionError, setSubmissionError] = useState(false);

  const caption = useMemo(() => {
    if (sumbissionError) return '';
    if (file) {
      const fileSize = (file[0].size / (1024 * 1024)).toFixed(2);
      return `${fileSize}MB file successfully uploaded.`;
    }
    return 'Supported file types: pdf, txt, docx – 10mb max.';
  }, [file]);

  const onSubmit = () => {
    if (!file?.[0].size) {
      setSubmissionError(true);
      const inputError = setTimeout(() => setSubmissionError(false), 2000);
      clearTimeout(inputError);
    } else {
      onImport();
    }
  };

  return (
    <Modal.Container>
      <Modal.Header title="Import file" onClose={onClose} />
      <Box direction="column" mt={20} mb={24} mx={24} gap={16}>
        <div>
          <FieldLabel>File(s)</FieldLabel>
          <UploadArea
            disabled={isUploading}
            files={file || undefined}
            onCloseButtonClick={() => setFile(undefined)}
            variant="secondary"
            onUpload={setFile}
            label="Drop file(s) here or"
            error={false}
            errorMessage={sumbissionError && !isUploading ? 'File is invalid.' : undefined}
            className={uploadAreaStyles}
            caption={caption}
          />
        </div>
        <FolderSelect isDisabled={isUploading} />
      </Box>
      <Modal.Footer>
        <Modal.Footer.Button label="Cancel" variant="secondary" onClick={onClose} />
        <Modal.Footer.Button
          label={isUploading ? '' : 'Import'}
          isLoading={isUploading}
          disabled={isUploading || !file?.[0].size}
          className={submitButtonStyles}
          onClick={onSubmit}
        />
      </Modal.Footer>
    </Modal.Container>
  );
};
