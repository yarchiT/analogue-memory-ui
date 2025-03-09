import api from './api';
import { ApiResponse, CollectionResponse, CollectionItem } from '../types/api';

/**
 * Get user's collection
 */
export const getUserCollection = async (): Promise<CollectionItem[]> => {
  try {
    const response = await api.get<ApiResponse<CollectionResponse>>('/collection');
    return response.data?.items || [];
  } catch (error) {
    console.error('Failed to fetch user collection:', error);
    throw error;
  }
};

/**
 * Add item to user's collection
 */
export const addToCollection = async (itemId: string, notes?: string): Promise<boolean> => {
  try {
    await api.post<ApiResponse<{ success: boolean }>>('/collection/add', { 
      itemId,
      notes 
    });
    return true;
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
    await api.delete<ApiResponse<{ success: boolean }>>(`/collection/remove/${itemId}`);
    return true;
  } catch (error) {
    console.error(`Failed to remove item ${itemId} from collection:`, error);
    throw error;
  }
};

/**
 * Update notes for an item in the collection
 */
export const updateItemNotes = async (itemId: string, notes: string): Promise<boolean> => {
  try {
    await api.put<ApiResponse<{ success: boolean }>>(`/collection/notes/${itemId}`, { notes });
    return true;
  } catch (error) {
    console.error(`Failed to update notes for item ${itemId}:`, error);
    throw error;
  }
}; 