import { renderHook } from '@testing-library/react-hooks';
import { describe, it, vi } from 'vitest';

import { useOutsideClickHandler } from '../index';

describe('useOutsideClickHandler', () => {
  it('should call the callback when a click occurs outside the provided ref element', () => {
    const callback = vi.fn();
    const ref = { current: document.createElement('div') };

    renderHook(() => useOutsideClickHandler(ref, callback));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    outsideElement.click();
    document.body.removeChild(outsideElement);

    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should not call the callback when a click occurs inside the provided ref element', () => {
    const callback = vi.fn();
    const element = document.createElement('div');
    const ref = { current: element };

    renderHook(() => useOutsideClickHandler(ref, callback));

    const outsideElement = document.createElement('div');
    document.body.appendChild(outsideElement);
    element.click();
    document.body.removeChild(outsideElement);

    expect(callback).not.toHaveBeenCalled();
  });
});
