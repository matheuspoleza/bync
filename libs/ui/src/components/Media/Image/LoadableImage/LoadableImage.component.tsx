import { clsx } from '@bync/style';
import { useState } from 'react';

import { ContentLoader } from '@/components/Other/ContentLoader/ContentLoader.component';

import type { IAttachmentImage } from '../../Attachment/AttachmentImage/types';
import { loaderStyles, relativeContainerStyles } from './LoadableImage.css';

export interface ILoadableImage extends IAttachmentImage {
  loaderSize?: 'large' | 'medium';
  width?: string;
  height?: string;
  onImgLoad?: () => void;
  placeholderClassName?: string;
}

export const LoadableImage: React.FC<ILoadableImage> = ({
  src,
  alt = 'image',
  loaderSize = 'medium',
  testID,
  className,
  placeholderClassName,
  onImgLoad,
  width,
  height,
  ...props
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const onImageLoad = () => {
    onImgLoad?.();
    setIsImageLoaded(true);
  };

  const placeholder = (
    <ContentLoader
      width={width}
      height={height}
      size={loaderSize}
      className={clsx(placeholderClassName, loaderStyles)}
    />
  );

  return (
    <div className={relativeContainerStyles} style={{ width, height }}>
      <img
        {...props}
        src={src}
        width={width}
        height={height}
        data-testid={testID}
        alt={alt}
        className={className}
        onLoad={onImageLoad}
      />
      {!isImageLoaded && placeholder}
    </div>
  );
};
