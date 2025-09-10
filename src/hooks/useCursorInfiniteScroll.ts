import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface CursorInfiniteScrollOptions<T> {
  fetchData: (cursorId?: number) => Promise<{
    data: T[];
    nextCursorId: number | null;
  }>;
  autoLoad?: boolean;
  deps?: unknown[];
}

export interface CursorInfiniteScrollReturn<T> {
  data: T[];
  isLoading: boolean;
  hasMore: boolean;
  error: string | null;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  ref: (node?: Element | null) => void;
}

export function useCursorInfiniteScroll<T>({
  fetchData,
  autoLoad = true,
  deps = [],
}: CursorInfiniteScrollOptions<T>): CursorInfiniteScrollReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [nextCursorId, setNextCursorId] = useState<number | null>(null);

  // 로딩 상태를 ref로 관리하여 의존성 문제 해결
  const isLoadingRef = useRef(false);

  // deps 배열을 안정적으로 관리
  const stableDeps = useMemo(() => deps, [JSON.stringify(deps)]);

  // 무한 스크롤 ref (Intersection Observer에 연결)
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // 데이터 로드 함수
  const loadData = useCallback(
    async (cursorId?: number, reset = false) => {
      if (isLoadingRef.current) {
        return;
      }

      isLoadingRef.current = true;
      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchData(cursorId);

        if (reset) {
          setData(result.data);
        } else {
          setData((prev) => [...prev, ...result.data]);
        }

        setNextCursorId(result.nextCursorId);
        setHasMore(result.nextCursorId !== null);
      } catch (error_) {
        setError(
          error_ instanceof Error
            ? error_.message
            : '데이터를 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        isLoadingRef.current = false;
        setIsLoading(false);
      }
    },
    [fetchData]
  );

  // 더 많은 데이터 로드
  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingRef.current) {
      return;
    }
    await loadData(nextCursorId ?? undefined, false);
  }, [hasMore, nextCursorId, loadData]);

  // 데이터 새로고침
  const refresh = useCallback(async () => {
    setData([]);
    setHasMore(true);
    setNextCursorId(null);
    setError(null);
    await loadData(undefined, true);
  }, [loadData]);

  // 무한스크롤 자동 로딩 트리거
  useEffect(() => {
    if (autoLoad && inView && hasMore && !isLoadingRef.current) {
      loadMore();
    }
  }, [inView, hasMore, autoLoad, loadMore]);

  // 의존성 배열 변경 시 자동 새로고침
  useEffect(() => {
    if (stableDeps.length > 0) {
      refresh();
    }
  }, [stableDeps, refresh]);

  // 컴포넌트 마운트 시 초기 데이터 로드
  useEffect(() => {
    if (autoLoad && stableDeps.length === 0) {
      refresh();
    }
  }, [autoLoad, stableDeps.length, refresh]);

  return {
    data,
    isLoading,
    hasMore,
    error,
    loadMore,
    refresh,
    ref,
  };
}
