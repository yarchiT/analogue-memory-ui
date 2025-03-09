import api, { ApiResponse } from './api';
import { CollectionWithItems, MemoryItem } from '../types/api';

/**
 * Get user's collection with memory items
 */
export const getUserCollection = async (): Promise<Array<MemoryItem & { dateAdded: string; personalNote?: string }>> => {
  try {
    const response = await api.get<ApiResponse<CollectionWithItems>>('/users/collection');
    
    if (response.status === 'success' && response.data) {
      // Use type assertion to access the nested data
      const collectionData = response.data as unknown as CollectionWithItems;
      return collectionData.items || [];
    }
    
    return [];
  } catch (error) {
    console.error('Failed to fetch user collection:', error);
    throw error;
  }
};

/**
 * Add item to user's collection
 */
export const addToCollection = async (itemId: string, personalNote?: string): Promise<boolean> => {
  try {
    const response = await api.post<ApiResponse<{ success: boolean }>>('/users/collection/add', { 
      itemId,
      personalNote 
    });
    
    return response.status === 'success';
  } catch (error) {
    console.error(`Failed to add item ${itemId} to collection:`, error);
    throw error;
  }
};

/**
 * Remove item from user's collection
 */
export const removeFromCollection = async (itemId: string): Promise<boolean> => {
  try {
    const response = await api.delete<ApiResponse<{ success: boolean }>>(`/users/collection/remove/${itemId}`);
    
    return response.status === 'success';
  } catch (error) {
    console.error(`Failed to remove item ${itemId} from collection:`, error);
    throw error;
  }
};

/**
 * Update notes for an item in the collection
 */
export const updateItemNotes = async (itemId: string, personalNote: string): Promise<boolean> => {
  try {
    const response = await api.put<ApiResponse<{ success: boolean }>>(`/users/collection/notes/${itemId}`, { 
      personalNote 
    });
    
    return response.status === 'success';
  } catch (error) {
    console.error(`Failed to update notes for item ${itemId}:`, error);
    throw error;
  }
}; 