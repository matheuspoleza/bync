import { clsx } from '@bync/style';

import { Box } from '@/components/Utility/Box';

import { barStyles, trackStyles } from './LoadingBar.css';

export interface ILoadingBar {
  progress: number;
  testID?: string;
  className?: string;
  barClassName?: string;
}

export const LoadingBar: React.FC<ILoadingBar> = ({ progress, testID, className, barClassName }) => {
  return (
    <Box className={clsx(trackStyles, className)} testID={testID} width="100%">
      <Box
        className={clsx(barStyles, barClassName)}
        data-testid={`${testID}--bar`}
        style={{
          width: `${progress}%`,
        }}
      />
    </Box>
  );
};
