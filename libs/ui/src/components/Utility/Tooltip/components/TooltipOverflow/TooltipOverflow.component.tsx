import React, { useRef, useState } from 'react';

import { composeRefs } from '@/utils/ref.util';

import { Tooltip } from '../../Tooltip.component';
import type { ITooltipOverflow } from './TooltipOverflow.interface';

export const TooltipOverflow: React.FC<ITooltipOverflow> = ({
  getWidth = (node) => node.offsetWidth,
  placement = 'bottom',
  isOverflow = (node) => node.scrollWidth > node.clientWidth,
  referenceElement,
  ...props
}) => {
  const nodeRef = useRef<HTMLElement>(null);

  const [width, setWidth] = useState<number | undefined>(undefined);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Tooltip
      {...props}
      width={width}
      isOpen={isOpen}
      placement={placement}
      referenceElement={({ ref, ...referenceProps }) =>
        referenceElement({
          ...referenceProps,
          ref: composeRefs(ref, nodeRef),
          onOpen: () => {
            if (!nodeRef.current || !isOverflow(nodeRef.current)) return;

            setWidth(getWidth(nodeRef.current));
            setIsOpen(true);
          },
          onClose: () => setIsOpen(false),
        })
      }
    />
  );
};
