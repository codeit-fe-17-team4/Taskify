import { useEffect, useState } from 'react';
/**
 * 화면 사이즈가 지정한 breakpoint(rem 기준) 아래로 내려가면, isBreakPoint 상태가 변화하는 hook
 *
 * // @custom-variant tablet (@media (max-width: 80rem));
 * // @custom-variant mobile (@media (max-width: 48rem));
 */
const useIsBreakPoint = (breakpoint = 48) => {
  const [isBreakPoint, setIsBreakPoint] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${String(breakpoint)}rem)`);

    setIsBreakPoint(media.matches);

    const handleMediaChange = () => {
      setIsBreakPoint(media.matches);
    };

    media.addEventListener('change', handleMediaChange);

    return () => {
      media.removeEventListener('change', handleMediaChange);
    };
  }, [breakpoint]);

  return isBreakPoint;
};

export default useIsBreakPoint;
