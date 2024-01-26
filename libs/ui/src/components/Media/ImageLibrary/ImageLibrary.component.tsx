import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';

import { Box } from '@/components/Utility/Box/Box.component';
import { Scroll } from '@/components/Utility/Scroll/Scroll.component';
import { Surface } from '@/components/Utility/Surface/Surface.component';
import { VirtualizedContent } from '@/components/Utility/VirtualizedContent/VirtualizedContent.component';

import { imageLibraryStyle } from './ImageLibrary.css';
import type { BaseImage, IImageLibrary } from './ImageLibrary.interface';
import { IMAGE_TILE_HEIGHT, ImageTile } from './ImageTile';

export const ImageLibrary = <Image extends BaseImage>({
  testID,
  images,
  onImageRemove,
  onImageSelect,
}: IImageLibrary<Image>): React.ReactElement => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const count = Math.ceil(images.length / 2);
  const virtualizer = useVirtualizer({
    count,
    overscan: 3,
    estimateSize: (index) => IMAGE_TILE_HEIGHT + (index === count - 1 ? 0 : 1),
    getScrollElement: () => scrollRef.current,
  });

  const virtualItems = virtualizer.getVirtualItems();

  return (
    <Surface width="300px" height="384px" data-testid={`${testID}--container`}>
      <Scroll ref={scrollRef} className={imageLibraryStyle}>
        <VirtualizedContent
          start={virtualItems[0]?.start ?? 0}
          testID={`${testID}--list`}
          totalSize={virtualizer.getTotalSize()}
        >
          {virtualItems.map((item) => {
            const index = item.index * 2;
            const leftImage = images[index];
            const rightImage = images[index + 1];

            if (!leftImage && !rightImage) return null;

            return (
              <Box gap={1} key={item.key} height={`${item.size}px`}>
                <ImageTile
                  src={leftImage?.url}
                  onClick={onImageSelect && (() => onImageSelect?.(leftImage))}
                  onRemove={onImageRemove && (() => onImageRemove?.(leftImage))}
                />
                <ImageTile
                  src={rightImage?.url}
                  onClick={onImageSelect && (() => onImageSelect?.(rightImage))}
                  onRemove={onImageRemove && (() => onImageRemove?.(rightImage))}
                />
              </Box>
            );
          })}
        </VirtualizedContent>
      </Scroll>
    </Surface>
  );
};
