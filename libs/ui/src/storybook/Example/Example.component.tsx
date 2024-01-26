import type { VariantProps } from '@bync/style';
import { clsx } from '@bync/style';

import { Box, Link } from '@/components';

import * as StoryTheme from '../StoryTheme.css';
import { exampleInfoStyles, exampleStyles } from './Example.css';
import { ExampleCopy } from './ExampleCopy';
import { ExampleDetails } from './ExampleDetails';

export type IExample = VariantProps<typeof exampleStyles> &
  React.PropsWithChildren & {
    componentName?: string;
    details: Record<string, any>;
    center?: boolean;
    isDemo?: boolean;
  };

export const Example: React.FC<IExample> = ({
  componentName,
  details,
  variant = 'light',
  basis = 'all',
  center,
  isDemo,
  children,
}) => {
  return (
    <Box
      direction="column"
      align={center ? 'center' : 'start'}
      className={clsx(exampleStyles({ variant, basis }), StoryTheme[variant])}
    >
      {children}
      {isDemo && (
        <Box direction="column" className={exampleInfoStyles}>
          <ExampleDetails details={details} />
          <Box justify="end" align="center" gap={8}>
            {!!componentName && <ExampleCopy componentName={componentName} details={details} variant={variant} />}
            <Link
              size="medium"
              label="#"
              href={`#examples--${Object.values(details)
                .filter((value) => !['object', 'function'].includes(typeof value))
                .map(String)
                .join('-')}`}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};
