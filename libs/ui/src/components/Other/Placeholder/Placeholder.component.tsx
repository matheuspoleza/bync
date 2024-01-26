import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box/Box.component';

import { placeHolderStyle } from './Placeholder.css';

export const Placeholder: React.FC<IBox> = (props) => {
  return (
    <Box className={placeHolderStyle} {...props}>
      🧑‍💻 Placeholder 🔨
    </Box>
  );
};
