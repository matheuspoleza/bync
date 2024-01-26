import { SquareButton } from '@/components/Buttons/SquareButton';
import { Input } from '@/components/Inputs/Input';

import { container, inputContainer, inputModifier, searchIconRecipe, suffixIconStyles } from './Search.css';
import type { ISearch } from './types';

export const Search: React.FC<ISearch> = ({
  value,
  onValueChange,
  placeholder,
  suffixIconName,
  onSuffixIconClick,
  ...props
}) => {
  const hasSuffixIcon = !!suffixIconName && !!onSuffixIconClick;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.code !== 'Escape') return;

    event.preventDefault();
    onValueChange?.('');
  };

  const onClearClick = (event: React.MouseEvent) => {
    event.stopPropagation();

    onValueChange?.('');
  };

  return (
    <div className={container}>
      <Input
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        value={value}
        variant="ghost"
        onKeyDown={onKeyDown}
        className={inputModifier}
        placeholder={placeholder}
        onValueChange={onValueChange}
        prefixIconName={value ? 'CloseM' : 'Search'}
        prefixIconOnClick={value ? onClearClick : undefined}
        containerClassName={inputContainer}
        iconClassName={searchIconRecipe({ hasValue: !!value })}
        {...props}
      />

      {hasSuffixIcon && (
        <SquareButton
          size="medium"
          onClick={onSuffixIconClick}
          iconName={suffixIconName}
          className={suffixIconStyles}
        />
      )}
    </div>
  );
};
