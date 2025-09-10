import { useCallback, useEffect, useState } from 'react';
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

  // 무한 스크롤 ref (Intersection Observer에 연결)
  const { ref, inView } = useInView({
    threshold: 0.1,
    rootMargin: '100px',
  });

  // 데이터 누적 및 상태 업데이트
  const loadData = useCallback(
    async (cursorId?: number, reset = false) => {
      if (isLoading) {
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await fetchData(cursorId);

        if (reset) {
          setData(result.data); // 새로고침: 기존 데이터 교체
        } else {
          setData((prev) => [...prev, ...result.data]); // 기존 댓글 밑에 새 댓글 추가
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
        setIsLoading(false);
      }
    },
    [fetchData, isLoading]
  );

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoading) {
      return;
    }
    await loadData(nextCursorId ?? undefined, false);
  }, [hasMore, isLoading, nextCursorId, loadData]);

  const refresh = useCallback(async () => {
    setData([]);
    setHasMore(true);
    setNextCursorId(null);
    setError(null);
    await loadData(undefined, true);
  }, [loadData]);

  // 🎯 무한스크롤 자동 로딩 트리거
  // 사용자가 스크롤해서 감지 요소가 화면에 보이면 자동으로 다음 데이터 로드
  useEffect(() => {
    if (autoLoad && inView && hasMore && !isLoading) {
      loadMore(); // 다음 댓글 페이지 로드
    }
  }, [inView, hasMore, isLoading, autoLoad, loadMore]);

  // 🔄 의존성 배열 변경 시 자동 새로고침
  // deps 배열의 값이 변경되면 (예: cardId 변경) 자동으로 데이터 새로고침
  useEffect(() => {
    if (deps.length > 0) {
      refresh();
    }
  }, [deps, refresh]);

  // 🚀 컴포넌트 마운트 시 초기 데이터 로드
  // 컴포넌트가 처음 렌더링될 때 자동으로 첫 번째 데이터 로드
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
