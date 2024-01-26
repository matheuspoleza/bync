import { useRef, useState } from 'react';

import { Button } from '@/components/Buttons/Button';
import { Menu, MenuItem } from '@/components/Navigation/Menu';
import { Popper } from '@/components/Utility/Popper';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';

export interface IGenerateButtonMenu {
  isDisabled?: boolean;
  onOptionClick?: (option: number) => void;
}
const options = [3, 5, 10];

export const GenerateButtonMenu: React.FC<IGenerateButtonMenu> = ({ onOptionClick, isDisabled = false }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useOutsideClickHandler(menuRef, () => setIsMenuOpen(false));

  return (
    <Popper
      placement="bottom-start"
      referenceElement={({ onOpen, onClose, isOpen, ref }) => (
        <Button
          ref={ref}
          onClick={() => (isOpen ? onClose() : onOpen())}
          isActive={isOpen}
          fullWidth
          iconName="Generate"
          label="Generate"
          disabled={isDisabled}
        />
      )}
    >
      {({ onClose: onMenuClose }) => {
        const onItemClick = (count: number) => {
          setIsMenuOpen(!isMenuOpen);
          onOptionClick?.(count);
          onMenuClose();
        };

        return (
          <Menu width="328px">
            {options.map((option, i) => (
              <MenuItem
                key={i}
                label={`Generate ${option} values and synonyms`}
                onClick={() => onItemClick(option)}
                maxWidth={280}
              />
            ))}
          </Menu>
        );
      }}
    </Popper>
  );
};
