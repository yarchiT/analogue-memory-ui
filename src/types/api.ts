/**
 * API response types for Analogue Memory
 */

// Base API response type
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

// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface CategoriesResponse {
  categories: Category[];
}

// Memory item types
export interface MemoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  decade: string;
  year: number;
  imageUrl: string;
  popularity: number;
  tags: string[];
}

export interface MemoryItemsResponse {
  items: MemoryItem[];
}

// User types
export interface User {
  id: string;
  username: string;
  email: string;
  birthYear?: number;
  location?: {
    country?: string;
    region?: string;
  };
  joinDate: string;
  collection?: Array<{
    itemId: string;
    dateAdded: string;
    personalNote?: string;
  }>;
  following?: string[];
  followers?: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface UserProfileResponse {
  user: User;
}

// Collection types
export interface CollectionItem {
  itemId: string;
  dateAdded: string;
  personalNote?: string;
}

export interface CollectionWithItems {
  items: Array<MemoryItem & {
    dateAdded: string;
    personalNote?: string;
  }>;
}

// Health check response
export interface HealthCheckResponse {
  status: string;
  message: string;
}

// Search response
export interface SearchResponse {
  items: MemoryItem[];
}

// Error response
export interface ErrorResponse {
  status: 'fail' | 'error';
  message: string;
  errors?: Array<{ message: string; path: string[] }>;
  stack?: string;
} 