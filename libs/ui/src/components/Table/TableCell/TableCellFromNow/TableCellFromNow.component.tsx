import dayjs from 'dayjs';
import { useMemo } from 'react';

import type { ITableCellFromNow } from './TableCellFromNow.interface';

export const TableCellFromNow: React.FC<ITableCellFromNow> = ({ date, label }): React.ReactElement => {
  const fromNow = useMemo(() => {
    const now = dayjs();
    const dateToCompare = dayjs(date);
    const diffInSeconds = now.diff(dateToCompare, 'second');
    const isLessThanAMinute = diffInSeconds <= 60;

    if (isLessThanAMinute) return 'Just now';

    const str = dateToCompare.fromNow().replace('minutes', 'mins');

    return str.charAt(0).toUpperCase() + str.slice(1);
  }, [date]);

  return <>{label({ label: fromNow })}</>;
};
