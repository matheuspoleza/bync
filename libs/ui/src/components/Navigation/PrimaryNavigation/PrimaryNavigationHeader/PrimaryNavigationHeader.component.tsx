import { clsx } from '@bync/style';

import { Icon } from '@/components/Media/Icon';
import { Header } from '@/components/Navigation/Header';
import { Menu } from '@/components/Navigation/Menu';
import { Divider } from '@/components/Other/Divider';
import { Popper } from '@/components/Utility/Popper';
import { usePopperModifiers } from '@/hooks';

import { PrimaryNavigationItem } from '../PrimaryNavigationItem';
import type { IPrimaryNavigationHeader } from '../types';
import {
  button,
  container,
  dividerStyles,
  navigationHeader,
  navigationItemhMargin,
  nubIcon,
} from './PrimaryNavigationHeader.css';

export const PrimaryNavigationHeader: React.FC<IPrimaryNavigationHeader> = ({ children, menuProps }) => {
  const modifiers = usePopperModifiers([{ name: 'offset', options: { offset: [0, 0] } }]);

  return (
    <Popper
      placement="bottom-end"
      modifiers={modifiers}
      referenceElement={({ ref, isOpen, onOpen, onClose }) => (
        <Header kind="primaryNavigation" className={container}>
          <div ref={ref}>
            <PrimaryNavigationItem
              onClick={isOpen ? onClose : onOpen}
              iconName="VoiceflowLogomark"
              className={clsx(button({ isActive: isOpen }), navigationHeader, navigationItemhMargin)}
              iconProps={{ viewBox: '0 0 30px 22.5px', width: '30px', height: '22.5px' }}
              renderIcon={() => (
                // TODO: we're using legacy vf icon for now, but we should use the new one
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1080"
                  zoomAndPan="magnify"
                  viewBox="0 0 810 809.999993"
                  height="1080"
                  preserveAspectRatio="xMidYMid meet"
                  version="1.0"
                >
                  <defs>
                    <clipPath id="24d90926ba">
                      <path
                        d="M 290.789062 243 L 442 243 L 442 394 L 290.789062 394 Z M 290.789062 243 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                    <clipPath id="522882ff83">
                      <path
                        d="M 290.789062 416 L 519.539062 416 L 519.539062 567 L 290.789062 567 Z M 290.789062 416 "
                        clip-rule="nonzero"
                      />
                    </clipPath>
                  </defs>
                  <g clip-path="url(#24d90926ba)">
                    <path
                      fill="#ffffff"
                      d="M 366.433594 243 C 324.746094 243 290.949219 276.796875 290.949219 318.480469 L 290.949219 393.964844 L 366.433594 393.964844 C 408.117188 393.964844 441.914062 360.167969 441.914062 318.480469 L 441.914062 243 Z M 366.433594 243 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                  <g clip-path="url(#522882ff83)">
                    <path
                      fill="#ffffff"
                      d="M 448.0625 416.042969 L 290.949219 416.042969 L 290.949219 491.523438 C 290.949219 533.203125 324.738281 567.007812 366.433594 567.007812 L 519.039062 567.007812 L 519.039062 487.019531 C 519.039062 447.820312 487.257812 416.042969 448.0625 416.042969 Z M 448.0625 416.042969 "
                      fill-opacity="1"
                      fill-rule="nonzero"
                    />
                  </g>
                </svg>
              )}
            />
            <Icon className={nubIcon} name="NubDown" height={24} width={24} viewBox="0 0 24 24" />
          </div>
          <Divider dark className={dividerStyles} />
        </Header>
      )}
    >
      {() => (
        <Menu minWidth={0} {...menuProps}>
          {children}
        </Menu>
      )}
    </Popper>
  );
};
