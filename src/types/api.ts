/**
 * API response types for Analogue Memory
 */

// Base API response type
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  results?: number;
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

// User collection types
export interface CollectionItem extends MemoryItem {
  addedAt: string;
  notes?: string;
}

export interface CollectionResponse {
  items: CollectionItem[];
}

// Health check response
export interface HealthCheckResponse {
  status: string;
  message: string;
  timestamp: string;
  environment: string;
}

// Search response
export interface SearchResponse {
  items: MemoryItem[];
  query: string;
}

// Error response
export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
} 