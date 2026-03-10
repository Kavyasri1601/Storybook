import { renderHook, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useClickOutside } from './useClickOutside';

describe('useClickOutside', () => {
  it('should call handler when clicking outside', () => {
    const handler = vi.fn();

    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    // Create a div element and attach ref
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', {
      value: element,
      writable: true,
    });
    document.body.appendChild(element);

    // Click outside the element
    fireEvent.mouseDown(document.body);

    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(element);
  });

  it('should not call handler when clicking inside', () => {
    const handler = vi.fn();

    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    // Create a div element and attach ref
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', {
      value: element,
      writable: true,
    });
    document.body.appendChild(element);

    // Click inside the element
    fireEvent.mouseDown(element);

    expect(handler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(element);
  });

  it('should not call handler when disabled', () => {
    const handler = vi.fn();

    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler, false));

    // Create a div element and attach ref
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', {
      value: element,
      writable: true,
    });
    document.body.appendChild(element);

    // Click outside the element
    fireEvent.mouseDown(document.body);

    expect(handler).not.toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(element);
  });

  it('should handle touch events', () => {
    const handler = vi.fn();

    const { result } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    // Create a div element and attach ref
    const element = document.createElement('div');
    Object.defineProperty(result.current, 'current', {
      value: element,
      writable: true,
    });
    document.body.appendChild(element);

    // Touch outside the element
    fireEvent.touchStart(document.body);

    expect(handler).toHaveBeenCalledTimes(1);

    // Cleanup
    document.body.removeChild(element);
  });

  it('should cleanup event listeners on unmount', () => {
    const handler = vi.fn();
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useClickOutside<HTMLDivElement>(handler));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('mousedown', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('touchstart', expect.any(Function));

    removeEventListenerSpy.mockRestore();
  });
});
