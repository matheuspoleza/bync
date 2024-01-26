import { TextProperty } from '../../SlateEditor.constant';
import { textPropertyButtonFactory, toggleTextPropertyButtonFactory } from './utils/text-button.util';

export const TextItalicButton = toggleTextPropertyButtonFactory({
  hotkey: 'i',
  iconName: 'Italic',
  property: TextProperty.ITALIC,
  canRemove: true,
  displayName: 'TextItalicButton',
});

export const TextUnderlineButton = toggleTextPropertyButtonFactory({
  hotkey: 'u',
  iconName: 'Underline',
  property: TextProperty.UNDERLINE,
  canRemove: true,
  displayName: 'TextUnderlineButton',
});

export const TextStrikeThroughButton = toggleTextPropertyButtonFactory({
  hotkey: 's',
  iconName: 'Strikethrough',
  property: TextProperty.STRIKE_THROUGH,
  canRemove: true,
  displayName: 'TextStrikeThroughButton',
});

export const TextBoldButton = textPropertyButtonFactory({
  value: '700',
  hotkey: 'b',
  iconName: 'Bold',
  property: TextProperty.FONT_WEIGHT,
  canRemove: true,
  displayName: 'TextBoldButton',
});
