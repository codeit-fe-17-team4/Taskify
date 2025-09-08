import { type RefObject, useEffect } from 'react';

export default function useCallbackWhenItemClick(
  itemRef: RefObject<HTMLButtonElement | null>,
  callback: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!itemRef.current) {
        return;
      }
      if (itemRef.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, itemRef]);
}
