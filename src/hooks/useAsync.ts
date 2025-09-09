import { useEffect, useRef, useState } from 'react';

interface useFetchParams<T> {
  asyncFunction: () => Promise<T>;
  deps?: unknown[];
  immediate?: boolean;
}
interface fetchStateInterface<T> {
  loading: boolean;
  data: T | null;
  error: Error | null;
}
export default function useAsync<T>({
  asyncFunction,
  deps = [],
  immediate = false,
}: useFetchParams<T>) {
  const [state, setState] = useState<fetchStateInterface<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const asyncFnRef = useRef(asyncFunction);

  useEffect(() => {
    asyncFnRef.current = asyncFunction;
  }, [asyncFunction]);

  const refetchRef = useRef<() => Promise<void> | null>(null);

  if (refetchRef.current === null) {
    refetchRef.current = async () => {
      setState((prev) => ({ ...prev, error: null, loading: true }));
      try {
        const response = await asyncFnRef.current();

        setState((prev) => ({ ...prev, loading: false, data: response }));
      } catch (error) {
        if (error instanceof Error) {
          setState({ data: null, loading: false, error });
          throw new Error(`fetch 실패 : ${error.message}`);
        }
      }
    };
  }

  useEffect(() => {
    if (refetchRef.current === null) {
      return;
    }
    if (immediate) {
      refetchRef.current();
    }
  }, [immediate, ...deps]);

  return { ...state, refetch: refetchRef.current };
}

export function useFetch<T>({
  asyncFunction,
  deps = [],
  immediate = true,
}: useFetchParams<T>) {
  return useAsync({
    asyncFunction,
    immediate,
    deps,
  });
}

export function useMutate<T>({ asyncFunction, deps = [] }: useFetchParams<T>) {
  const {
    data,
    loading,
    error,
    refetch: mutate,
  } = useAsync({
    asyncFunction,
    immediate: false,
    deps,
  });

  return { data, loading, error, mutate };
}
