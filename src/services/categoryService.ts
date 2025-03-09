import api from './api';
import { ApiResponse, CategoriesResponse, Category } from '../types/api';

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse<CategoriesResponse>>('/categories');
    return response.data?.categories || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    throw error;
  }
};

/**
 * Get a category by ID
 */
export const getCategoryById = async (id: string): Promise<Category | null> => {
  try {
    const response = await api.get<ApiResponse<{ category: Category }>>(`/categories/${id}`);
    return response.data?.category || null;
  } catch (error) {
    console.error(`Failed to fetch category with ID ${id}:`, error);
    throw error;
  }
}; 