import api, { ApiResponse } from './api';
import { CategoriesResponse, Category } from '../types/api';

/**
 * Get all categories
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get<ApiResponse<CategoriesResponse>>('/categories');
    
    if (response.status === 'success' && response.data) {
      // Use type assertion to access the nested data
      const categoriesData = response.data as unknown as CategoriesResponse;
      return categoriesData.categories || [];
    }
    
    return [];
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
    
    if (response.status === 'success' && response.data) {
      // Use type assertion to access the nested data
      const categoryData = response.data as unknown as { category: Category };
      return categoryData.category;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch category with ID ${id}:`, error);
    throw error;
  }
}; 