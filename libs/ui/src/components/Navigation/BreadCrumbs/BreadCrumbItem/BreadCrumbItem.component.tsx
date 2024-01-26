import { Link } from '@/components/Navigation/Link';
import { Text } from '@/components/Text';

import type { IBreadCrumbItem } from '../types';
import { breadCrumbItemContainer, breadCrumbTextRecipe, dividerStyle } from './BreadCrumbsItem.css';

export const BreadCrumbItem: React.FC<IBreadCrumbItem> = ({ label, onClick, isLast, testID }) => {
  return (
    <span className={breadCrumbItemContainer}>
      <Link
        label={label}
        testID={testID}
        weight={isLast ? 'semiBold' : 'regular'}
        variant="secondary"
        onClick={isLast ? undefined : onClick}
        className={breadCrumbTextRecipe({ isLast })}
      />

      {!isLast && (
        <Text variant="basic" className={dividerStyle}>
          /
        </Text>
      )}
    </span>
  );
};
