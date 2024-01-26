import { clsx } from '@bync/style';

import { SquareButton } from '@/components/Buttons';
import { Avatar } from '@/components/Media/Avatar';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';
import { Tooltip } from '@/components/Utility/Tooltip/Tooltip.component';
import { useTooltipModifiers } from '@/hooks';

import { avatarItemContainer, avatarListButton, avatarListContainer, avatarToolTipModifier } from './AvatarList.css';
import type { IAvatarList } from './types';

export const getFirstChar = (name: string) => name.trimStart().charAt(0).toUpperCase();

export const AvatarList: React.FC<IAvatarList> = ({ className, testID, list, onButtonClick }) => {
  const { length } = list;

  const tooltipModifiers = useTooltipModifiers([{ name: 'offset', options: { offset: [0, 8] } }]);

  return (
    <Box className={clsx(className, avatarListContainer)} data-testid={testID} wrap="nowrap" direction="row">
      {onButtonClick && (
        <Box style={{ zIndex: length + 1 }}>
          <SquareButton
            iconName="Plus"
            onClick={onButtonClick}
            className={avatarListButton}
            variant="dark"
            testID={`${testID}--add-button`}
          />
        </Box>
      )}

      {list.map((item, i) => (
        <Box key={i} style={{ zIndex: length - i }}>
          <Tooltip
            placement="bottom"
            tooltipClassName={avatarToolTipModifier}
            hasArrow
            modifiers={tooltipModifiers}
            referenceElement={({ ref, onOpen, onClose }) => (
              <Avatar
                testID={`${testID}--item--${i}`}
                className={avatarItemContainer}
                variant={item.variant}
                onMouseEnter={onOpen}
                onMouseLeave={onClose}
                ref={ref}
                src={item.src}
                alt={item.alt}
                size="medium"
              >
                {getFirstChar(item.name)}
              </Avatar>
            )}
          >
            {() => <Text variant="caption">{item.name}</Text>}
          </Tooltip>
        </Box>
      ))}
    </Box>
  );
};
