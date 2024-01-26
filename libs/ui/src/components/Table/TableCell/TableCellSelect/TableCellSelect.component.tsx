import { CheckboxControl } from '@/components/Form/CheckboxControl';

import { useTableSelectedItems } from '../../Table.hook';
import type { TableItem, TableNonGroupItem } from '../../Table.interface';
import { checkboxContainerStyle, containerStyle, iconContainerStyle } from './TableCellSelect.css';
import type { ITableCellSelect } from './TableCellSelect.interface';
import { TableCellSelectGroupIcon } from './TableCellSelectGroupIcon';

export const TableCellSelect = <Item extends TableItem>({
  item,
  icon: iconProp,
}: ITableCellSelect<Item>): React.ReactElement => {
  const { isSelected, onToggleSelected } = useTableSelectedItems(item.id);

  const icon = item.group ? <TableCellSelectGroupIcon /> : iconProp?.(item as TableNonGroupItem<Item>);

  const onContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    onToggleSelected();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={onContainerClick} className={containerStyle({ withIcon: !isSelected && !!icon })}>
      <div className={checkboxContainerStyle({ withIcon: !!icon && !isSelected })}>
        <CheckboxControl value={isSelected} />
      </div>

      {icon && <div className={iconContainerStyle({ isSelected })}>{icon}</div>}
    </div>
  );
};
