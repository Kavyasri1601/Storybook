import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useDebounce, useDebouncedCallback } from './useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));

    expect(result.current).toBe('initial');
  });

  it('should debounce value changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });

    // Value should not change immediately
    expect(result.current).toBe('initial');

    // Fast-forward time
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Value should now be updated
    expect(result.current).toBe('updated');
  });

  it('should reset timer on new value', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'first' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should still be initial
    expect(result.current).toBe('initial');

    rerender({ value: 'second' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Value should still be initial (timer reset)
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(200);
    });

    // Value should now be 'second'
    expect(result.current).toBe('second');
  });

  it('should use default delay of 500ms', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe('updated');
  });
});

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce callback execution', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 500));
    const [debouncedFn] = result.current;

    debouncedFn();

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments to callback', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 500));
    const [debouncedFn] = result.current;

    debouncedFn('arg1', 'arg2');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).toHaveBeenCalledWith('arg1', 'arg2');
  });

  it('should cancel pending calls', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 500));
    const [debouncedFn, cancel] = result.current;

    debouncedFn();
    cancel();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();
  });

  it('should reset timer on multiple calls', () => {
    const callback = vi.fn();

    const { result } = renderHook(() => useDebouncedCallback(callback, 500));
    const [debouncedFn] = result.current;

    debouncedFn();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    debouncedFn();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should cleanup on unmount', () => {
    const callback = vi.fn();

    const { result, unmount } = renderHook(() => useDebouncedCallback(callback, 500));
    const [debouncedFn] = result.current;

    debouncedFn();
    unmount();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
