import { clsx } from '@bync/style';

import type { ILink } from '@/components/Navigation/Link';
import { Link } from '@/components/Navigation/Link';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import { chunkRecipe, contentRecipe, linkStyles } from './Chunk.css';

export interface IChunk extends Omit<ILink, 'inline' | 'label'> {
  href?: string;
  label?: string;
  content: string;
}

export const Chunk: React.FC<IChunk> = ({ label, className, content, onClick, ...props }) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!label || !onClick) return;
    e.preventDefault();
    onClick(e);
  };

  const styleModifier = chunkRecipe({ withHeader: !!label });
  const contentStyles = contentRecipe({ withHeader: !!label });

  return (
    <Box as="article" className={clsx(styleModifier, className)} direction="column">
      {label ? (
        <Link {...props} overflow label={label} className={linkStyles} weight="semiBold" onClick={handleClick} />
      ) : null}
      <Text className={contentStyles}>{content}</Text>
    </Box>
  );
};
