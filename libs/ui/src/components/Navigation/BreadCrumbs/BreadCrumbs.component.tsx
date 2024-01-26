import { BreadCrumbItem } from './BreadCrumbItem';
import { containerStyle } from './BreadCrumbs.css';
import type { IBreadCrumbs } from './types';

export const BreadCrumbs: React.FC<IBreadCrumbs> = ({ items, testID }) => {
  return (
    <section className={containerStyle} data-testid={testID}>
      {items.map(({ label, onClick }, index) => (
        <BreadCrumbItem
          key={index}
          label={label}
          isLast={index === items.length - 1}
          testID={`${testID}--${index}`}
          onClick={onClick}
        />
      ))}
    </section>
  );
};
