import { useEffect, useRef } from 'react';
import { DismissableLayerProvider, useDismissable } from 'react-dismissable-layers';
import { Manager, Popper as ReactPopper, Reference } from 'react-popper';

import { PopperProvider, usePopperContext } from '@/contexts/Popper.context';
import { usePersistFunction } from '@/hooks/usePersistFunction';

import { Portal } from '../Portal';
import { DEFAULT_MODIFIERS } from './Popper.constant';
import type { IPopper, PopperModifiers } from './Popper.interface';

export const Popper = <Modifiers,>({
  arrow,
  delay: delayProp = [0, 0],
  isOpen = false,
  inline = false,
  zIndex,
  onOpen,
  testID,
  onClose,
  children,
  placement = 'bottom',
  modifiers = DEFAULT_MODIFIERS as PopperModifiers<Modifiers>,
  className,
  portalNode,
  dismissEvent = 'click',
  disableLayers = false,
  onPreventClose,
  arrowClassName,
  referenceElement,
}: IPopper<Modifiers>): React.ReactElement => {
  const popperContext = usePopperContext();
  const openTimeoutRef = useRef<number | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const popperReferenceRef = useRef<HTMLElement>(null);
  const popperContainerRef = useRef<HTMLDivElement>(null);
  const [isPopperOpened, onToggle, onForceClose] = useDismissable(isOpen, {
    ref: popperContainerRef,
    onClose,
    dismissEvent,
    preventClose: onPreventClose,
    disableLayers,
  });
  const delay = Array.isArray(delayProp) ? delayProp : [delayProp, delayProp];

  const clearTimers = usePersistFunction(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    if (typeof openTimeoutRef.current === 'number') {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
  });

  const handleClose = usePersistFunction(() => {
    clearTimers();

    if (!isPopperOpened) return;

    const openPopper = () => {
      closeTimeoutRef.current = null;

      onForceClose();
    };

    if (delay[1]) {
      closeTimeoutRef.current = window.setTimeout(openPopper, delay[1]);
    } else {
      openPopper();
    }
  });

  const handleOpen = usePersistFunction(() => {
    clearTimers();

    if (isPopperOpened) return;

    const openPopper = () => {
      openTimeoutRef.current = null;

      onToggle();
      onOpen?.();
    };

    if (delay[0]) {
      openTimeoutRef.current = window.setTimeout(openPopper, delay[0]);
    } else {
      openPopper();
    }
  });

  const handleToggle = usePersistFunction(() => {
    if (!isPopperOpened && openTimeoutRef.current === null) {
      handleOpen();
    } else {
      handleClose();
    }
  });

  useEffect(() => {
    if (isOpen !== isPopperOpened) onToggle();
  }, [isOpen]);

  useEffect(() => () => clearTimers(), []);

  const popper = isPopperOpened && (
    <Portal portalNode={portalNode ?? popperContext.portalNode}>
      <DismissableLayerProvider>
        <PopperProvider zIndex={zIndex} portalNode={portalNode}>
          <ReactPopper strategy="fixed" innerRef={popperContainerRef} placement={placement} modifiers={modifiers}>
            {({ ref, style, update, forceUpdate, arrowProps }) => (
              <div
                ref={ref}
                style={{ ...style, zIndex: zIndex ?? popperContext.zIndex }}
                data-testid={`${testID}--popper-content`}
                className={className}
              >
                {arrow && (
                  <div ref={arrowProps.ref} style={arrowProps.style} className={arrowClassName} data-popper-arrow>
                    {arrow}
                  </div>
                )}

                {children({
                  update,
                  isOpen: isPopperOpened,
                  onOpen: handleOpen,
                  onClose: handleClose,
                  onToggle: handleToggle,
                  forceUpdate,
                  referenceRef: popperReferenceRef,
                })}
              </div>
            )}
          </ReactPopper>
        </PopperProvider>
      </DismissableLayerProvider>
    </Portal>
  );

  return (
    <Manager>
      <Reference innerRef={popperReferenceRef}>
        {({ ref }) =>
          referenceElement?.({
            ref,
            popper: inline && popper,
            onOpen: handleOpen,
            isOpen: isPopperOpened,
            onClose: handleClose,
            onToggle: handleToggle,
            attributes: { 'data-testid': `${testID}--popper-reference` },
          })
        }
      </Reference>

      {!inline && popper}
    </Manager>
  );
};
