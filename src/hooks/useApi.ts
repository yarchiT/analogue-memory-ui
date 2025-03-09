import { useState, useEffect, useCallback } from 'react';
import { ApiError } from '../services/api';

interface ApiHookState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface ApiHookOptions {
  immediate?: boolean;
  dependencies?: any[];
}

/**
 * Custom hook for API data fetching with loading and error states
 */
export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<T>,
  options: ApiHookOptions = { immediate: true, dependencies: [] }
) => {
  const [state, setState] = useState<ApiHookState<T>>({
    data: null,
    isLoading: options.immediate === false ? false : true,
    error: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setState((prevState) => ({ ...prevState, isLoading: true, error: null }));
        const data = await apiFunction(...args);
        setState({ data, isLoading: false, error: null });
        return { data, error: null };
      } catch (error) {
        const apiError = error instanceof ApiError 
          ? error 
          : new Error(error instanceof Error ? error.message : 'Unknown error');
        
        setState((prevState) => ({ 
          ...prevState, 
          isLoading: false, 
          error: apiError 
        }));
        
        return { data: null, error: apiError };
      }
    },
    [apiFunction]
  );

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, options.dependencies || []);

  return {
    ...state,
    execute,
    // Helper function to reset the state
    reset: useCallback(() => {
      setState({
        data: null,
        isLoading: false,
        error: null,
      });
    }, []),
  };
};

export default useApi; 