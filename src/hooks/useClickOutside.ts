import { useEffect, useRef, type RefObject } from 'react';

type Handler = (event: MouseEvent | TouchEvent) => void;

/**
 * Hook to detect clicks outside of a referenced element
 *
 * @param handler - Callback function to run when clicking outside
 * @param enabled - Whether the hook is enabled (default: true)
 * @returns Ref to attach to the element
 *
 * @example
 * const dropdownRef = useClickOutside<HTMLDivElement>(() => {
 *   setIsOpen(false);
 * });
 *
 * return <div ref={dropdownRef}>...</div>;
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: Handler,
  enabled: boolean = true
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (!el || el.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, enabled]);

  return ref;
}

/**
 * Hook to detect clicks outside of multiple referenced elements
 *
 * @param refs - Array of refs to check against
 * @param handler - Callback function to run when clicking outside all refs
 * @param enabled - Whether the hook is enabled (default: true)
 *
 * @example
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * const menuRef = useRef<HTMLDivElement>(null);
 *
 * useClickOutsideMultiple([buttonRef, menuRef], () => {
 *   setIsOpen(false);
 * });
 */
export function useClickOutsideMultiple<T extends HTMLElement = HTMLElement>(
  refs: RefObject<T>[],
  handler: Handler,
  enabled: boolean = true
): void {
  useEffect(() => {
    if (!enabled) return;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if click was inside any of the refs
      const isInside = refs.some((ref) => {
        const el = ref.current;
        return el && el.contains(event.target as Node);
      });

      if (!isInside) {
        handler(event);
      }
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, handler, enabled]);
}
