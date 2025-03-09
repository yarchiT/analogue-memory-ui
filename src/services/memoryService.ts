import api from './api';
import { ApiResponse, MemoryItemsResponse, MemoryItem } from '../types/api';

/**
 * Get all memory items
 */
export const getAllItems = async (): Promise<MemoryItem[]> => {
  try {
    const response = await api.get<ApiResponse<MemoryItemsResponse>>('/items');
    return response.data?.items || [];
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
    return response.data?.item || null;
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
    const response = await api.get<ApiResponse<MemoryItemsResponse>>(`/items/search?query=${encodeURIComponent(query)}`);
    return response.data?.items || [];
  } catch (error) {
    console.error(`Failed to search memory items with query "${query}":`, error);
    throw error;
  }
};

/**
 * Get memory items by category
 */
export const getItemsByCategory = async (categoryId: string): Promise<MemoryItem[]> => {
  try {
    const response = await api.get<ApiResponse<MemoryItemsResponse>>(`/items/category/${categoryId}`);
    return response.data?.items || [];
  } catch (error) {
    console.error(`Failed to fetch memory items for category ${categoryId}:`, error);
    throw error;
  }
}; 