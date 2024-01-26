export const isEventActionKey = (event: React.MouseEvent | MouseEvent) =>
  event.metaKey || event.ctrlKey || event.shiftKey || event.button === 2;
