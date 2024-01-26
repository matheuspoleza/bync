import { VoiceflowLogomark } from '@bync/icons';

import { type ILoadingBar, LoadingBar } from '@/components/Other/LoadingBar';
import { Box } from '@/components/Utility';

import { boxStyles } from './PageLoader.css';

export interface IPageLoader extends ILoadingBar {
  testID?: string;
}

export const PageLoader: React.FC<IPageLoader> = ({ testID, ...props }) => {
  return (
    <Box testID={testID} className={boxStyles} width="100%" height="100%" align="center" justify="center">
      <Box width="124px" height="68px" direction="column" align="center">
        <Box mb={16}>
          <VoiceflowLogomark width="48px" height="48px" />
        </Box>
        <LoadingBar {...props} />
      </Box>
    </Box>
  );
};
