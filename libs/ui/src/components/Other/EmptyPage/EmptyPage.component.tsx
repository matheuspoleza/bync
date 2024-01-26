import { clsx } from '@bync/style';

import { Button } from '@/components/Buttons/Button';
import { Link } from '@/components/Navigation/Link';
import { Text } from '@/components/Text';
import { Box } from '@/components/Utility/Box';

import * as IllustrationComponents from './components/Illustrations';
import {
  baseCardStyles,
  buttonContainerStyles,
  buttonStyles,
  descriptionStyles,
  imageStyles,
  linkStyles,
  titleStyles,
} from './EmptyPage.css';
import type { IEmptyPage } from './types';

export const EmptyPage: React.FC<IEmptyPage> = ({
  title,
  button,
  testID,
  className,
  linkTarget = '_blank',
  description,
  illustration,
  learnMoreLink,
}) => {
  const Illustration = illustration && IllustrationComponents[illustration];

  return (
    <Box
      className={clsx(baseCardStyles, className)}
      data-testid={testID}
      direction="column"
      align="center"
      justify="center"
    >
      {!!Illustration && (
        <Box as="figure" align="center" justify="center" className={imageStyles}>
          <Illustration data-testid={`${testID}--illustration`} />
        </Box>
      )}

      <Text variant="basic" weight="semiBold" className={titleStyles}>
        {title}
      </Text>
      <Text variant="basic" className={descriptionStyles}>
        {description}
        {learnMoreLink && <Link className={linkStyles} href={learnMoreLink} label="Learn more" target={linkTarget} />}
      </Text>

      {button && (
        <div className={buttonContainerStyles}>
          <Button {...button} className={clsx(button.className, buttonStyles)} />
        </div>
      )}
    </Box>
  );
};
