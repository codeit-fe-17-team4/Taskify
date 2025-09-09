import { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export interface CursorInfiniteScrollOptions<T> {
  /** 데이터를 가져오는 함수 */
  fetchData: (cursorId?: number) => Promise<{
    data: T[];
    nextCursorId: number | null;
  }>;
  /** 자동 로딩 여부 (기본값: true) */
  autoLoad?: boolean;
  /** 의존성 배열 (이 값들이 변경되면 데이터를 다시 로드) */
  deps?: unknown[];
}

export interface CursorInfiniteScrollReturn<T> {
  /** 현재 로드된 모든 데이터 */
  data: T[];
  /** 로딩 중인지 여부 */
  isLoading: boolean;
  /** 더 이상 로드할 데이터가 없는지 여부 */
  hasMore: boolean;
  /** 에러 상태 */
  error: string | null;
  /** 다음 페이지를 수동으로 로드하는 함수 */
  loadMore: () => Promise<void>;
  /** 데이터를 새로고침하는 함수 */
  refresh: () => Promise<void>;
  /** 무한 스크롤을 위한 ref (Intersection Observer에 연결) */
  ref: (node?: Element | null) => void;
}

/**
 * 커서 기반 무한 스크롤을 위한 커스텀 훅
 * @param options 커서 기반 무한 스크롤 옵션
 * @returns 커서 기반 무한 스크롤 관련 상태와 함수들
 */
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

  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  const loadData = useCallback(
    async (cursorId?: number, reset = false) => {
      if (isLoading) return;

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
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : '데이터를 불러오는 중 오류가 발생했습니다.'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [fetchData, isLoading]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) return;
    await loadData(nextCursorId, false);
  }, [hasMore, isLoading, nextCursorId, loadData]);

  const refresh = useCallback(async () => {
    setData([]);
    setHasMore(true);
    setNextCursorId(null);
    setError(null);
    await loadData(undefined, true);
  }, [loadData]);

  // 자동 로딩
  useEffect(() => {
    if (autoLoad && inView && hasMore && !isLoading) {
      loadMore();
    }
  }, [inView, hasMore, isLoading, autoLoad, loadMore]);

  // 의존성 변경 시 데이터 새로고침
  useEffect(() => {
    if (deps.length > 0) {
      refresh();
    }
  }, deps);

  // 초기 데이터 로드
  useEffect(() => {
    if (autoLoad) {
      refresh();
    }
  }, []);

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
