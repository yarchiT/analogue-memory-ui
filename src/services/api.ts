/**
 * API service for Analogue Memory
 * Handles all API requests to the backend
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const ASSET_URL = import.meta.env.VITE_ASSET_URL || 'http://localhost:3000/assets';

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

/**
 * Base fetch function with error handling
 */
async function fetchApi<T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(
      data.message || 'Something went wrong',
      response.status
    );
  }

  return data;
}

/**
 * Health check endpoint
 */
export const checkApiHealth = async () => {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
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