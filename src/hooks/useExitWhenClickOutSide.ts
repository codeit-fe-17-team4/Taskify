import { type Ref, useEffect, useRef } from 'react';

export default function useExitWhenClickOutSide(
  callback: () => void
): Ref<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!ref.current) {
        return;
      }
      if (!ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [callback]);

  return ref;
}
