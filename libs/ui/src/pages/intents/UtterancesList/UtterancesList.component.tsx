import { Box, Scroll } from '@/components';

interface IUtteranceList {
  header: React.ReactNode;
  children: React.ReactNode;
}

export const UtterancesList: React.FC<IUtteranceList> = ({ header, children }) => {
  return (
    <Box pt={11} direction="column" maxHeight="100%" overflow="hidden">
      {header}

      <Scroll>
        <div>{children}</div>
      </Scroll>
    </Box>
  );
};
