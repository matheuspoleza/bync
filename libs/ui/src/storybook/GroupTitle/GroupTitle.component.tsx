import { useContext } from 'react';

import { Link, Text } from '@/components';
import { DemoContext } from '@/contexts';

import { groupCountStyles, groupLinkStyles, groupTitleStyles } from './GroupTitle.css';

export interface IGroupTitle {
  group: string;
  value?: any;
  count?: number;
}

export const GroupTitle: React.FC<IGroupTitle> = ({ group, value, count }) => {
  const isDemo = useContext(DemoContext);

  return (
    <Text className={groupTitleStyles} variant="h2">
      <strong>{group}</strong>
      {!!value && `: ${value}`}
      {!!count && (
        <Text variant="caption" className={groupCountStyles}>
          ({count})
        </Text>
      )}
      {isDemo && (
        <Link
          label="#"
          // eslint-disable-next-line sonarjs/no-nested-template-literals
          href={`#examples--${group}${value ? `-${value}` : ''}`}
          size="medium"
          variant="secondary"
          className={groupLinkStyles}
        />
      )}
    </Text>
  );
};
