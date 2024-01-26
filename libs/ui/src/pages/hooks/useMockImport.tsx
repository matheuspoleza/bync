import { useState } from 'react';

export const useMockImport = (onAfterImport?: VoidFunction) => {
  const [isUploading, setIsUploading] = useState(false);

  const onImport = () => {
    setIsUploading(true);

    // Simulate file upload delay
    const uploadTimeout = setTimeout(() => {
      setIsUploading(false);
      onAfterImport?.();
      clearTimeout(uploadTimeout);
    }, 2000);
  };

  return { isUploading, onImport };
};
