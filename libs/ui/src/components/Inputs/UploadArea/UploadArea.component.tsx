import { clsx } from '@bync/style';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/Buttons/Button';
import { SquareButton } from '@/components/Buttons/SquareButton';
import { InputFormControl } from '@/components/Form/InputFormControl';
import { LoadableImage } from '@/components/Media/Image';
import { Text } from '@/components/Text';

import type { IUploadArea } from './types';
import {
  areaStyles,
  browseButton,
  buttonContainer,
  closeButton,
  container,
  imageHoverDimEffect,
  imagePreviewContainerStyles,
  imagePreviewStyles,
  textModifiers,
} from './UploadArea.css';
import { UploadStateSection } from './UploadStateSection';

const isImageFile = (file?: File) => !!file?.type.startsWith('image/');

export const UploadArea: React.FC<IUploadArea> = ({
  label = 'Upload XYZ file here or',
  variant = 'primary',
  isLoading,
  files,
  imagePreview: imagePreviewProp,
  error,
  caption,
  errorMessage,
  disabled,
  onCloseButtonClick,
  acceptedFileTypes,
  onUpload,
  isSuccessful,
  maxFileSize,
  maxFiles,
  testID,
  className,
}) => {
  const [filesToUpload, setFilesToUpload] = useState<File[] | undefined>(files || []);

  const [isImage, setIsImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleFileChange = (files: File[] | undefined) => {
    setFilesToUpload(files);
    if (files?.length === 1) {
      const isImage = isImageFile(files[0]);
      if (isImage) {
        setImagePreview(URL.createObjectURL(files[0]));
        setIsImage(isImage);
      }
    }
  };

  const onDropCallback = useCallback(
    (files: File[]) => {
      try {
        onUpload(files);
        handleFileChange(files);
      } catch {
        // skip
      }
    },
    [onUpload, handleFileChange]
  );

  const handleOnCloseButtonClick = () => {
    setIsDraggingOver(false);
    onCloseButtonClick?.();
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles,
    maxSize: maxFileSize,
    onDrop: onDropCallback,
    disabled: disabled || isLoading,
    noClick: true,
    accept: acceptedFileTypes,
    onDragEnter: () => setIsDraggingOver(true),
    onDragLeave: () => setIsDraggingOver(false),
  });

  useEffect(() => {
    if (imagePreviewProp) {
      setIsImage(true);
      setImagePreview(imagePreviewProp);
    } else {
      handleFileChange(files);
    }
  }, [files, imagePreviewProp]);

  useEffect(
    () => () => {
      try {
        URL.revokeObjectURL(imagePreview);
      } catch {
        // skip
      }
    },
    [imagePreview]
  );

  const showImagePreview = imagePreview && isImage && !isLoading;
  const showDefaultState = !showImagePreview && !isLoading && !isSuccessful && !error && !filesToUpload;
  const showCloseButton = onCloseButtonClick && filesToUpload && !isLoading && !disabled;
  const hasError = error || !!errorMessage;

  const containerStyles = areaStyles({
    isDragging: isDraggingOver,
    hasImage: !!imagePreview && isImage && !isLoading,
    hasFile: !!filesToUpload && !isImage,
    isError: hasError,
    disabled,
  });

  return (
    <InputFormControl caption={caption} errorMessage={errorMessage}>
      <section className={container}>
        <div {...getRootProps({ className: clsx(containerStyles, className) })} data-testid={testID}>
          <input data-testid={`${testID}--upload-input`} type="file" {...getInputProps()} />
          {showDefaultState && !hasError && (
            <>
              <Text className={textModifiers}>{label}</Text>
              <div className={buttonContainer}>
                <Button label="Browse" variant={variant} onClick={open} disabled={disabled} />
              </div>
            </>
          )}
          {showImagePreview && (
            <section className={imagePreviewStyles}>
              <Button label="Browse" variant="tertiary" className={browseButton} onClick={open} />
              <LoadableImage
                src={imagePreview}
                className={imagePreviewStyles}
                alt="preview"
                data-testid={`${testID}--preview-image`}
              />
              <span className={imagePreviewContainerStyles} style={{ backgroundImage: `url(${imagePreview})` }} />
              <span className={imageHoverDimEffect} />
            </section>
          )}
          <UploadStateSection
            isLoading={isLoading}
            error={hasError}
            files={filesToUpload}
            open={open}
            disabled={disabled}
          />
          {showCloseButton && (
            <span className={closeButton}>
              <SquareButton iconName="CloseM" size="small" onClick={handleOnCloseButtonClick} />
            </span>
          )}
        </div>
      </section>
    </InputFormControl>
  );
};
