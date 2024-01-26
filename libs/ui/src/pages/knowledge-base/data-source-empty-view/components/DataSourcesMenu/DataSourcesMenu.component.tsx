import type { Placement } from '@popperjs/core';
import { useRef, useState } from 'react';

import { Header } from '@/components/Navigation/Header';
import { Menu, MenuItem } from '@/components/Navigation/Menu';
import { Popper } from '@/components/Utility/Popper';
import { Tooltip } from '@/components/Utility/Tooltip';
import { useOutsideClickHandler } from '@/hooks/useOutsideClickHandler';

import type { IMockDataSource } from '../../mock';
import { DATA_SOURCES } from '../../mock';

export interface IDataSource {
  onOptionClick?: (option: IMockDataSource) => void;
}

export const DataSourcesMenu: React.FC<IDataSource> = ({ onOptionClick }) => {
  // this state management is a temporary solution,
  // it should be moved out of here after the implementation of the real data sources
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  useOutsideClickHandler(menuRef, () => setIsMenuOpen(false));

  return (
    <Popper
      placement="bottom"
      referenceElement={({ onOpen, isOpen, ref }) => (
        <span ref={ref}>
          <Header.Button.Primary label="Add data source" onClick={onOpen} isActive={isOpen} />
        </span>
      )}
    >
      {({ onClose: onMenuClose }) => (
        <Menu maxWidth={149} width={149} listRef={menuRef}>
          {DATA_SOURCES.map((option) => (
            <Tooltip
              placement={(option.placement ?? 'left-start') as Placement}
              width={option.width}
              key={option.id}
              referenceElement={({ ref, onClose, onToggle }) => (
                <MenuItem
                  ref={ref}
                  label={option.label}
                  key={option.id}
                  onMouseEnter={onToggle}
                  onClick={() => {
                    setIsMenuOpen(!isMenuOpen);

                    onOptionClick?.(option);
                    onMenuClose();
                    onClose();
                  }}
                />
              )}
            >
              {({ onClose }) => (
                <>
                  <Tooltip.Caption mb={6}>{option.caption}</Tooltip.Caption>
                  <Tooltip.Button label="Learn" onClick={() => onClose()} />
                </>
              )}
            </Tooltip>
          ))}
        </Menu>
      )}
    </Popper>
  );
};
