/**
 * API service for Analogue Memory
 * Handles all API requests to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';
const ASSET_URL = import.meta.env.VITE_ASSET_URL || 'http://localhost:3000/assets';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  errors?: Array<{ message: string; path: string[] }>;
  
  constructor(message: string, status: number, errors?: Array<{ message: string; path: string[] }>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}

/**
 * Standard API response format
 */
export interface ApiResponse<T> {
  status: 'success' | 'fail' | 'error';
  data?: T;
  message?: string;
  results?: number;
  pagination?: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  errors?: Array<{ message: string; path: string[] }>;
}

/**
 * Base fetch function with error handling
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string> || {})
  };

  // Add authorization header if token exists
  const token = localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    headers,
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'Something went wrong',
      response.status,
      data.errors
    );
  }

  return data as ApiResponse<T>;
}

/**
 * Health check endpoint
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL}/health`);
    return await response.json();
  } catch (error) {
    console.error('API Health check failed:', error);
    throw error;
  }
};

/**
 * Get asset URL
 */
export const getAssetUrl = (path: string): string => {
  if (path.startsWith('http')) return path;
  return `${ASSET_URL}/${path.startsWith('/') ? path.slice(1) : path}`;
};

export default {
  get: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, data: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'POST',
      body: JSON.stringify(data)
    }),
  
  put: <T>(endpoint: string, data: any, options?: RequestInit) => 
    fetchApi<T>(endpoint, { 
      ...options, 
      method: 'PUT',
      body: JSON.stringify(data)
    }),
  
  delete: <T>(endpoint: string, options?: RequestInit) => 
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),
    
  getAssetUrl,
  checkApiHealth
}; 