/**
 * Axios Interceptor Configuration - FIXED VERSION
 * Menangani:
 * - Auto-refresh access token saat expired
 * - Request interceptor (add auth headers)
 * - Response interceptor (error handling, token refresh)
 * - Proper queue management
 * - Prevent infinite loops
 */

import axios from "axios";
import { jwtDecode } from "jwt-decode";

// ==================== GLOBAL STATE ====================
let accessToken = null;
let isRefreshing = false;
let failedQueue = [];

// ==================== QUEUE MANAGEMENT ====================
/**
 * Process queue request yang pending saat refresh token
 */
const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  isRefreshing = false;
  failedQueue = [];
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Set access token
 */
export const setAccessToken = (token) => {
  accessToken = token;
};

/**
 * Get access token
 */
export const getAccessToken = () => {
  return accessToken;
};

/**
 * Clear access token
 */
export const clearAccessToken = () => {
  accessToken = null;
};

/**
 * Check if token is expired
 */
const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    return true;
  }
};

/**
 * Redirect ke halaman login
 */
const redirectToLogin = () => {
  clearAccessToken();
  window.location.href = "/login";
};

// ==================== CREATE AXIOS INSTANCE ====================
const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10000,
  withCredentials: true, // ← PENTING: Kirim cookie dengan setiap request
  headers: {
    "Content-Type": "application/json",
  },
});

// ==================== REQUEST INTERCEPTOR ====================
/**
 * Menambahkan access token ke Authorization header
 * Juga log info untuk debugging
 */
apiClient.interceptors.request.use(
  (config) => {
    // Ambil access token terbaru
    const token = getAccessToken();

    // Tambahkan ke Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // PENTING: Pastikan withCredentials tetap true
    config.withCredentials = true;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// ==================== RESPONSE INTERCEPTOR ====================
/**
 * Menangani response dan auto-refresh token saat expired
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const originalUrl = `${originalRequest.method?.toUpperCase()} ${originalRequest.url}`;

    // ========== TOKEN EXPIRED (401) ==========
    if (error.response?.status === 401) {
      // Jika sudah coba refresh (dari request yang sama), jangan retry lagi
      if (originalRequest._retry) {
        redirectToLogin();
        return Promise.reject(error);
      }

      // Jika ini adalah refresh endpoint sendiri yang return 401, jangan refresh lagi
      if (
        originalRequest.url.includes("/access-tokens") ||
        originalRequest._skipRefresh
      ) {
        redirectToLogin();
        return Promise.reject(error);
      }

      // ===== JIKA SEDANG REFRESH, QUEUE REQUEST INI =====
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(apiClient(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      // ===== MULAI REFRESH TOKEN =====
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // PENTING: Pakai apiClient.post (bukan axios.post)
        // Endpoint HARUS sesuai dengan server Anda
        const response = await apiClient.post(
          "/access-tokens", // ← SESUAIKAN DENGAN ENDPOINT SERVER ANDA
          {}, // Empty body
          {
            _skipRefresh: true, // Flag untuk skip interceptor pada refresh endpoint
          },
        );

        const newAccessToken = response.data.data;

        // Set access token baru
        setAccessToken(newAccessToken);

        // Process semua request yang tertunda dengan token baru
        processQueue(null, newAccessToken);

        // Retry original request dengan token baru
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Process queue dengan error
        processQueue(refreshError, null);

        // Redirect ke login
        redirectToLogin();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// ==================== EXPORTS ====================

/**
 * Setup interceptor saat app initialize
 * Call ini di App.js atau main.jsx
 */
export const setupAxiosInterceptors = (token) => {
  if (token) {
    setAccessToken(token);
  }
};

export default apiClient;
