import { Box } from '@/components/Utility/Box/Box.component';

export const LeftSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box gap={16} justify="start" grow={1} overflowX="hidden">
    {children}
  </Box>
);

export const CenterSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box justify="center" align="center" grow={1}>
    <Box justify="center" grow={1}>
      {children}
    </Box>
  </Box>
);

export const RightSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box gap={12} align="center" justify="end" grow={1}>
    {children}
  </Box>
);

export const RightActionsSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box gap={7} align="center">
    {children}
  </Box>
);

export const LeftActionsSection: React.FC<React.PropsWithChildren> = ({ children }) => (
  <Box gap={8} align="center">
    {children}
  </Box>
);
