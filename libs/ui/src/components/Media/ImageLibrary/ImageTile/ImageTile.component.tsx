import { ContextMenu, MenuItem } from '@/components/Navigation';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { IMAGE_TILE_HEIGHT } from './ImageTile.constant';
import { imageFileContainerStyle, imageFileStyle, imageStyle } from './ImageTile.css';
import type { IImageTile } from './ImageTile.interface';

export const ImageTile: React.FC<IImageTile> = ({ src, name, onClick, onRemove }) => {
  if (!src) return <Box width="100%" />;

  const onRemoveClick = (onClose: VoidFunction) => () => {
    onRemove?.();
    onClose();
  };

  const getReferenceElement = ({
    isOpen,
    onContextMenu,
  }: {
    isOpen?: boolean;
    onContextMenu?: React.MouseEventHandler;
  } = {}) => (
    <Box
      style={{ backgroundImage: `url(${src})` }}
      align="end"
      width="100%"
      height={`${IMAGE_TILE_HEIGHT}px`}
      onClick={onClick}
      className={imageStyle}
      onContextMenu={onContextMenu}
    >
      <Box pt={9} pr={12} pb={8} pl={12} width="100%" className={imageFileContainerStyle({ active: isOpen })}>
        <Text className={imageFileStyle} variant="caption">
          {name || src.substring(src.lastIndexOf('/') + 1)}
        </Text>
      </Box>
    </Box>
  );

  return onRemove ? (
    <ContextMenu width={179} referenceElement={getReferenceElement}>
      {({ onClose }) => <MenuItem label="Remove from library" onClick={onRemoveClick(onClose)} />}
    </ContextMenu>
  ) : (
    getReferenceElement()
  );
};
