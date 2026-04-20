// Member: Yuchen Bao
// Hook for fetching data from NewsAPI

import { useState, useEffect, useCallback } from "react";

// Shape of fetch state
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Generic data-fetching React hook
export function useFetch<T>(url: string, deps: unknown[] = []) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: !!url,
    error: null,
  });

  // Fetch data from API
  const fetchData = useCallback(async () => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await fetch(url);
      if (!res.ok) {
        setState({ data: null, loading: false, error: `HTTP ${res.status}` });
        return;
      }
      const data: T = await res.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: (err as Error).message });
    }
  }, [url, ...deps]);

  // Trigger fetch on dependency change
  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}
