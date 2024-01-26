import type { Link } from '@/components/Navigation/Link';
import { Divider } from '@/components/Other/Divider';
import { Table } from '@/components/Table';
import { Text } from '@/components/Text';
import type { IBox } from '@/components/Utility/Box';
import { Box } from '@/components/Utility/Box';
import { layout } from '@/styles/theme';

import { dividerNegativeMargin, textStyles } from './EmptyStateBanner.css';

export interface IEmptyStateBanner extends IBox {
  title: string;
  icon: JSX.Element;
  caption: string | JSX.Element;
  /**
   * @description provide either a button, or a popper with a button as a reference element
   * @example <Header.Button.Primary label="Add data source" onClick={onOpen} isActive={isOpen} />
   */
  button?: React.ReactNode;
  link?: React.ReactElement<React.ComponentProps<typeof Link>>;
}

export const EmptyStateBanner: React.FC<IEmptyStateBanner> = ({
  title,
  caption,
  icon,
  button,
  link,
  height = 'calc(100vh - 56px)',
  ...props
}) => {
  return (
    <Box direction="column" height={height} align="center" {...props}>
      <Table.Navigation breadCrumbsItems={[{ label: 'Agent name' }, { label: 'All data sources (0)' }]} />
      <Divider noPadding className={dividerNegativeMargin} />

      <Box
        id="no-sources-banner"
        direction="column"
        width="100%"
        py={24}
        justify="center"
        align="center"
        height={`calc(100vh - ${layout.header.height * 2}px)`}
      >
        {icon}
        <Box id="header" pt={24} pb={4} px={20} justify="center" width="280px" direction="column">
          <Text variant="h4" weight="semiBold" align="center">
            {title}
          </Text>
        </Box>
        <Box id="caption-paragraph" align="center" width="240px" pb={16}>
          <Text align="center" as="span" className={textStyles}>
            <Text as="span">{caption}</Text> {link}
          </Text>
        </Box>

        {button}
      </Box>
    </Box>
  );
};
