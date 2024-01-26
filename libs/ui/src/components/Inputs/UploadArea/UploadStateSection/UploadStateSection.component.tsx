import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Link } from '@/components/Navigation/Link';
import { LoadingSpinner } from '@/components/Other/LoadingSpinner';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import {
  disabledStyles,
  errorIcon,
  errorSection,
  loadingSpinnerModifier,
  loadingText,
  successIcon,
  textModifiers,
} from '../UploadArea.css';

export interface IUploadStateSection {
  files?: File[] | undefined;
  isLoading?: boolean;
  isSuccessful?: boolean;
  error?: boolean;
  open?: () => void;
  disabled?: boolean;
}

export const UploadStateSection: React.FC<IUploadStateSection> = ({ files, isLoading, error, open, disabled }) => {
  const fileNames = files?.map((file) => file.name).join(', ');

  return (
    <Box direction="column" align="center" width="100%" overflow="hidden">
      {isLoading && (
        <>
          <Box mb={4}>
            <LoadingSpinner className={loadingSpinnerModifier} />
          </Box>

          <Text className={loadingText}>Uploading...</Text>
        </>
      )}
      {!isLoading && files && !error && (
        <>
          <Box mb={4}>
            <Icon name="Checkmark" className={successIcon} height="24px" width="24px" />
          </Box>
          <Text className={clsx(textModifiers, disabled && disabledStyles)}>{fileNames || 'Upload Successful'}</Text>
        </>
      )}
      {error && !isLoading && (
        <>
          <Box mb={4}>
            <Icon name="Warning" className={errorIcon} />
          </Box>

          <Box>
            <Text>Unable to upload.</Text>
            <span className={errorSection}>
              <Link label="Try again" onClick={open} />
            </span>
          </Box>
        </>
      )}
    </Box>
  );
};
