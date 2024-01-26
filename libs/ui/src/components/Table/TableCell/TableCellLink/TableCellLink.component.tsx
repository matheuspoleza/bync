import { clsx } from '@bync/style';

import { Link } from '@/components/Navigation/Link';
import { forwardRef } from '@/hocs';

import { tableCellLinkRecipe } from './TableCellLink.css';
import type { ITableCellLink } from './TableCellLink.interface';

export const TableCellLink = forwardRef<HTMLParagraphElement, ITableCellLink>('TableCellLink')(
  ({ className, isSelectable, ...props }, ref) => {
    const onClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      // needs to stop propagation to prevent the row from being selected
      event.stopPropagation();

      props.onClick?.(event);
    };

    const modifierStyles = tableCellLinkRecipe({ isSelectable });

    return <Link.Highlight ref={ref} {...props} className={clsx(modifierStyles, className)} onClick={onClick} />;
  }
);
