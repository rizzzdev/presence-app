/**
 * Custom Hook: useApi
 * Hook untuk menggunakan axios interceptor dengan loading, error, dan data handling
 */

import { useState, useCallback, useEffect } from "react";
import apiClient from "~/libs/api-client";

/**
 * Hook untuk fetch data dengan axios interceptor
 * @param {string} url - Endpoint URL
 * @param {object} options - Options (method, data, params, etc)
 * @returns {object} { data, loading, error, execute, refetch }
 */
export const useApi = (url, options = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  /**
   * Execute request
   */
  const execute = useCallback(
    async (customUrl = url, customOptions = {}) => {
      if (!customUrl) {
        console.error("❌ URL is required");
        return null;
      }

      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        const mergedOptions = {
          ...options,
          ...customOptions,
        };

        const response = await apiClient({
          url: customUrl,
          method: mergedOptions.method || "GET",
          data: mergedOptions.data,
          params: mergedOptions.params,
          ...mergedOptions,
        });

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        return response.data;
      } catch (err) {
        const errorMessage = err.response?.data?.message || err.message;

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        console.error("❌ API Error:", errorMessage);
        return err.response?.data;
      }
    },
    [url, options],
  );

  /**
   * Refetch data
   */
  const refetch = useCallback(() => {
    execute(url, options);
  }, [execute, url, options]);

  return {
    ...state,
    execute,
    refetch,
  };
};

export default useApi;
