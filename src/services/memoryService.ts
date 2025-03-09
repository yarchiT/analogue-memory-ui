import api, { ApiResponse } from './api';
import { MemoryItemsResponse, MemoryItem } from '../types/api';

interface GetItemsOptions {
  page?: number;
  limit?: number;
  sort?: string;
}

/**
 * Get all memory items
 */
export const getAllItems = async (options: GetItemsOptions = {}): Promise<{
  items: MemoryItem[];
  pagination?: ApiResponse<MemoryItemsResponse>['pagination'];
}> => {
  try {
    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page.toString());
    if (options.limit) queryParams.append('limit', options.limit.toString());
    if (options.sort) queryParams.append('sort', options.sort);
    
    const queryString = queryParams.toString();
    const endpoint = `/items${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<ApiResponse<MemoryItemsResponse>>(endpoint);
    
    if (response.status === 'success' && response.data) {
      const itemsData = response.data as unknown as MemoryItemsResponse;
      return {
        items: itemsData.items || [],
        pagination: response.pagination
      };
    }
    
    return { items: [] };
  } catch (error) {
    console.error('Failed to fetch memory items:', error);
    throw error;
  }
};

/**
 * Get a memory item by ID
 */
export const getItemById = async (id: string): Promise<MemoryItem | null> => {
  try {
    const response = await api.get<ApiResponse<{ item: MemoryItem }>>(`/items/${id}`);
    
    if (response.status === 'success' && response.data) {
      const itemData = response.data as unknown as { item: MemoryItem };
      return itemData.item;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch memory item with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Search memory items
 */
export const searchItems = async (query: string): Promise<MemoryItem[]> => {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }
    
    const response = await api.get<ApiResponse<MemoryItemsResponse>>(
      `/items/search?query=${encodeURIComponent(query)}`
    );
    
    if (response.status === 'success' && response.data) {
      const searchData = response.data as unknown as MemoryItemsResponse;
      return searchData.items || [];
    }
    
    return [];
  } catch (error) {
    console.error(`Failed to search memory items with query "${query}":`, error);
    throw error;
  }
};

/**
 * Get memory items by category
 */
export const getItemsByCategory = async (
  categoryId: string,
  options: GetItemsOptions = {}
): Promise<{
  items: MemoryItem[];
  pagination?: ApiResponse<MemoryItemsResponse>['pagination'];
}> => {
  try {
    const queryParams = new URLSearchParams();
    if (options.page) queryParams.append('page', options.page.toString());
    if (options.limit) queryParams.append('limit', options.limit.toString());
    if (options.sort) queryParams.append('sort', options.sort);
    
    const queryString = queryParams.toString();
    const endpoint = `/items/category/${categoryId}${queryString ? `?${queryString}` : ''}`;
    
    const response = await api.get<ApiResponse<MemoryItemsResponse>>(endpoint);
    
    if (response.status === 'success' && response.data) {
      const categoryData = response.data as unknown as MemoryItemsResponse;
      return {
        items: categoryData.items || [],
        pagination: response.pagination
      };
    }
    
    return { items: [] };
  } catch (error) {
    console.error(`Failed to fetch memory items for category ${categoryId}:`, error);
    throw error;
  }
}; 