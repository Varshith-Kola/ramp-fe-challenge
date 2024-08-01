import { useCallback, useContext, useState } from "react";
import { AppContext } from "../utils/context";
import { fakeFetch, RegisteredEndpoints } from "../utils/fetch";

export function useCustomFetch() {
  const [loading, setLoading] = useState(false);
  const { setError } = useContext(AppContext);

  const fetchWithCache = useCallback(
    async <TData, TParams extends object>(endpoint: RegisteredEndpoints, params?: TParams): Promise<TData> => {
      try {
        setLoading(true);
        const response = await fakeFetch<TData, TParams>(endpoint, params);
        return response;
      } catch (error) {
        setError(error as string);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setError]
  );

  const fetchWithoutCache = useCallback(
    async <TData, TParams extends object>(endpoint: RegisteredEndpoints, params?: TParams): Promise<TData> => {
      try {
        setLoading(true);
        const response = await fakeFetch<TData, TParams>(endpoint, params);
        return response;
      } catch (error) {
        setError(error as string);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setError]
  );

  return { fetchWithCache, fetchWithoutCache, loading };
}
