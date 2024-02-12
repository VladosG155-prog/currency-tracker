import { RefObject, useEffect } from 'react';

export function useOutsideClick(
  elementRef: RefObject<HTMLElement>,
  handler: () => void,
) {
  const handleClick = (e: MouseEvent) => {
    if (
      elementRef &&
      elementRef.current &&
      !elementRef.current.contains(e.target as Element)
    ) {
      e.stopPropagation();
      handler();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick, { capture: true });
    return () =>
      document.removeEventListener('click', handleClick, {
        capture: true,
      });
  }, []);
}
