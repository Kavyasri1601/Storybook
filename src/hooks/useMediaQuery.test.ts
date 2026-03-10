import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMediaQuery, useIsMobile, useIsDesktop } from './useMediaQuery';

describe('useMediaQuery', () => {
  const mockMatchMedia = (matches: boolean) => {
    const listeners: Array<(e: MediaQueryListEvent) => void> = [];

    const mql = {
      matches,
      media: '',
      onchange: null,
      addEventListener: vi.fn((event: string, listener: (e: MediaQueryListEvent) => void) => {
        if (event === 'change') {
          listeners.push(listener);
        }
      }),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
      // Helper to trigger change
      _triggerChange: (newMatches: boolean) => {
        listeners.forEach((listener) =>
          listener({ matches: newMatches } as MediaQueryListEvent)
        );
      },
    };

    window.matchMedia = vi.fn().mockReturnValue(mql);
    return mql;
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return false for non-matching query', () => {
    mockMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);
  });

  it('should return true for matching query', () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(true);
  });

  it('should update when media query changes', () => {
    const mql = mockMatchMedia(false);

    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    expect(result.current).toBe(false);

    act(() => {
      mql._triggerChange(true);
    });

    expect(result.current).toBe(true);
  });

  it('should cleanup listener on unmount', () => {
    const mql = mockMatchMedia(false);

    const { unmount } = renderHook(() => useMediaQuery('(min-width: 768px)'));

    unmount();

    expect(mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});

describe('useIsMobile', () => {
  it('should return true when screen is mobile size', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true);
  });
});

describe('useIsDesktop', () => {
  it('should return true when screen is desktop size', () => {
    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });

    const { result } = renderHook(() => useIsDesktop());

    expect(result.current).toBe(true);
  });
});
