import { SquareButton } from '@/components/Buttons';
import { Button } from '@/components/Buttons/Button';
import { Link } from '@/components/Navigation/Link';
import { Text } from '@/components/Text';
import { Surface } from '@/components/Utility';

import { Icon } from '../Icon';
import { LoadableImage } from '../Image';
import {
  buttonContainerStyles,
  cardStyles,
  closeButton,
  descriptionStyles,
  imageContainerStyles,
  imageStyles,
  linkStyles,
  placeholderStyles,
  titleStyles,
} from './Card.css';
import type { ICard } from './types';

export const Card: React.FC<ICard> = ({
  title,
  imageSrc,
  iconName,
  description,
  learnMoreLink,
  primaryButtonLabel,
  secondaryButtonLabel,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  hasVerticalButtons,
  onClose,
}) => {
  const hasPrimaryButton = primaryButtonLabel && onPrimaryButtonClick;
  const hasSecondaryButton = secondaryButtonLabel && onSecondaryButtonClick;
  const hasButtons = (primaryButtonLabel && onPrimaryButtonClick) || (secondaryButtonLabel && onSecondaryButtonClick);
  const image = (
    <span className={imageContainerStyles}>
      {iconName && !imageSrc ? <Icon name={iconName} className={imageStyles} /> : null}
      {imageSrc && !iconName ? (
        <LoadableImage
          src={imageSrc}
          alt="card illustration"
          className={imageStyles}
          placeholderClassName={placeholderStyles}
        />
      ) : null}
    </span>
  );

  return (
    <Surface className={cardStyles[hasVerticalButtons ? 'vertical' : 'horizontal']}>
      {onClose && <SquareButton size="medium" iconName="CloseM" className={closeButton} onClick={onClose} />}
      {(imageSrc || iconName) && image}
      <Text variant="basic" weight="semiBold" className={titleStyles}>
        {title}
      </Text>
      <Text variant="basic" className={descriptionStyles[hasButtons ? 'withoutPadding' : 'withPadding']}>
        {description}
        <Link className={linkStyles} href={learnMoreLink} label="Learn more" />
      </Text>
      {hasButtons && (
        <div className={buttonContainerStyles}>
          {hasSecondaryButton && (
            <Button variant="secondary" fullWidth label={secondaryButtonLabel} onClick={onSecondaryButtonClick} />
          )}
          {hasPrimaryButton && <Button fullWidth label={primaryButtonLabel} onClick={onPrimaryButtonClick} />}
        </div>
      )}
    </Surface>
  );
};
