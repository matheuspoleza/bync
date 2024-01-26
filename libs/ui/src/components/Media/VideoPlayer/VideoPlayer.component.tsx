import type { VariantProps } from '@bync/style';
import { clsx } from '@bync/style';
import { useEffect, useRef, useState } from 'react';

import { ContentLoader } from '@/components/Other/ContentLoader';
import type { BaseProps } from '@/types';

import { loaderStyles, videoContainerStyles, videoRecipe } from './VideoPlayer.css';

export interface IVideoPlayer
  extends BaseProps,
    React.ComponentPropsWithoutRef<'video'>,
    VariantProps<typeof videoRecipe> {
  cover?: boolean;
}

export const VideoPlayer: React.FC<IVideoPlayer> = ({
  testID,
  src,
  width = 480,
  height,
  cover = false,
  className,
  ...props
}) => {
  const videoElement = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);

  const parameters = { width: width ? `${width}px` : 'auto', height: height ? `${height}px` : 'auto' };

  useEffect(() => {
    if (!videoElement.current) {
      return;
    }

    const toggleLoading = () => {
      setIsReady(true);
    };

    (videoElement.current as Element).addEventListener('canplaythrough', toggleLoading);

    // eslint-disable-next-line consistent-return
    return () => {
      if (videoElement.current) {
        videoElement.current.removeEventListener('canplaythrough', toggleLoading);
      }
    };
  }, [videoElement.current, isReady]);

  return (
    <div className={videoContainerStyles} style={parameters} data-testid={`${testID}--video-container`}>
      {!isReady && (
        <ContentLoader
          className={loaderStyles}
          testID={`${testID}--video-loader`}
          style={{ zIndex: 1 }}
          {...parameters}
        />
      )}
      <video
        data-testid={testID}
        width={width}
        height={height}
        ref={videoElement}
        {...props}
        className={clsx(videoRecipe({ cover }), className)}
      >
        <track kind="captions" />
        <source src={src} type="video/mp4" data-testid={`${testID}--video-source`} />
      </video>
    </div>
  );
};
