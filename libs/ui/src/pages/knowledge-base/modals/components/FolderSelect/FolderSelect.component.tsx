import { useState } from 'react';

import { Dropdown } from '@/components/Form';
import { Menu, MenuItem } from '@/components/Navigation';
import { Box } from '@/components/Utility/Box';

import { FieldLabel } from '../../../../components/FieldLabel/FieldLabel.component';

const MOCK_FOLDERS = [
  { label: 'All data sources', id: '0' },
  { label: 'Folder number 2', id: '1' },
];

export interface IFolderSelect {
  isDisabled?: boolean;
  onDropdownChange?: VoidFunction;
}

export const FolderSelect: React.FC<IFolderSelect> = ({ onDropdownChange, isDisabled }) => {
  const [folder, setFolder] = useState<string>('All data sources');

  return (
    <Box direction="column">
      <FieldLabel>Folder</FieldLabel>
      <Dropdown disabled={isDisabled} value={folder} onChange={onDropdownChange} placeholder="Select folder (optional)">
        {({ onClose }) => (
          <Menu>
            {MOCK_FOLDERS.map((item) => (
              <MenuItem
                key={item.id}
                label={item.label}
                id={item.id}
                onClick={() => {
                  setFolder(item.label);
                  onClose();
                }}
              />
            ))}
          </Menu>
        )}
      </Dropdown>
    </Box>
  );
};
