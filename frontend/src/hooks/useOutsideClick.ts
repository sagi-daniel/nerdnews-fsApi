import { useEffect, useRef, RefObject } from 'react';

interface useOutsideClickProps {
  handler: () => void;
  listenCapturing?: boolean;
}

export function useOutsideClick({ handler, listenCapturing = true }: useOutsideClickProps): RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    }

    document.addEventListener('click', handleClick, listenCapturing);

    return () => document.removeEventListener('click', handleClick, listenCapturing);
  }, [handler, listenCapturing]);

  return ref;
}
