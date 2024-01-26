export const positionMenu = (targetElement: HTMLElement | null, menu: HTMLSpanElement | null) => {
  const position = {
    top: 0,
    left: 0,
  };

  if (!targetElement || !menu) {
    return position;
  }
  const targetElementRectangle = targetElement.getBoundingClientRect();
  const menuRect = menu.getBoundingClientRect();

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const rightOfTargetElement = targetElementRectangle.left + targetElementRectangle.width;
  const bottomOfTargetElement = targetElementRectangle.top + targetElementRectangle.height;

  if (rightOfTargetElement + menuRect.width > viewportWidth) {
    position.left = viewportWidth - menuRect.width;
  } else {
    position.left = rightOfTargetElement;
  }

  if (bottomOfTargetElement + menuRect.height > viewportHeight) {
    position.top = viewportHeight - menuRect.height;
  } else {
    position.top = bottomOfTargetElement;
  }

  return position;
};
