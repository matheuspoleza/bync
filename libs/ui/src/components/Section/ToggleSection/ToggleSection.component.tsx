import React, { useRef } from 'react';

import { Box } from '@/components/Utility/Box';

import { SectionHeader } from '../SectionHeader';
import type { ISectionHeader } from '../SectionHeader/SectionHeader.component';

export interface IToggleSection extends React.PropsWithChildren {
  isOpen: boolean;
  onToggle: () => void;
  headerProps: ISectionHeader;
  toggle?: React.ReactNode;
}

const isChildOfToggle = (target: HTMLElement, containerRef: HTMLSpanElement | null): boolean => {
  return containerRef?.contains(target) ?? false;
};

export const ToggleSection: React.FC<IToggleSection> = ({ isOpen, onToggle, children, headerProps, toggle }) => {
  const buttonContainerRef = useRef<HTMLSpanElement | null>(null);

  const handleToggle: React.MouseEventHandler = (event) => {
    // eslint-disable-next-line xss/no-mixed-html
    if (!isOpen && !isChildOfToggle(event.target as HTMLElement, buttonContainerRef.current)) {
      onToggle();
    }
  };

  const handleButtonClick: React.MouseEventHandler = (event) => {
    event.stopPropagation();
    onToggle();
  };

  return (
    <Box
      direction="column"
      width="100%"
      pt={11}
      pb={isOpen && children ? 0 : 11}
      gap={7}
      onClick={handleToggle}
      style={{ cursor: isOpen ? 'default' : 'pointer' }}
    >
      <SectionHeader variant={isOpen ? 'active' : 'basic'} {...headerProps}>
        <span ref={buttonContainerRef}>
          {toggle ?? <SectionHeader.Button iconName={isOpen ? 'Minus' : 'Plus'} onClick={handleButtonClick} />}
        </span>
      </SectionHeader>
      {isOpen ? children : null}
    </Box>
  );
};
