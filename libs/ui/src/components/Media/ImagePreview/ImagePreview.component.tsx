import { clsx } from '@bync/style';

import { Popper } from '@/components/Utility/Popper';
import { usePopperModifiers } from '@/hooks';

import { LoadableImage } from '../Image/LoadableImage';
import { imagePreviewStyle, placeholderStyles, previewContainerStyles } from './ImagePreview.css';
import type { IImagePreview } from './types';

export const ImagePreview: React.FC<IImagePreview> = ({
  image,
  testID,
  maxWidth = 500,
  maxHeight = 500,
  className,
  isExpanded = true,
  referenceElement,
}) => {
  const imagePreviewClassName = imagePreviewStyle({ isExpanded });
  const modifiers = usePopperModifiers([{ name: 'offset', options: { offset: [0, 5] } }]);

  return (
    <Popper referenceElement={referenceElement} placement="right" modifiers={modifiers} testID={testID}>
      {() => (
        <div className={previewContainerStyles}>
          <LoadableImage
            src={image}
            alt="preview"
            style={{ maxHeight, maxWidth }}
            className={clsx(imagePreviewClassName, className)}
            placeholderClassName={placeholderStyles}
            data-testid={`${testID}--image`}
          />
        </div>
      )}
    </Popper>
  );
};
