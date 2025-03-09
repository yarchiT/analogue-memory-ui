import { MemoryItem, Category as ApiCategory } from '../types/api';
import { Memory, Category } from '../mocks/memories';
import { getAssetUrl } from '../services/api';

/**
 * Map API memory item to frontend memory model
 */
export const mapApiItemToMemory = (item: MemoryItem): Memory => {
  return {
    id: item.id,
    title: item.name,
    imageUrl: item.imageUrl.startsWith('http') ? item.imageUrl : getAssetUrl(item.imageUrl),
    category: item.category,
    year: item.year,
    description: item.description,
  };
};

/**
 * Map API category to frontend category model
 */
export const mapApiCategoryToCategory = (category: ApiCategory): Category => {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
  };
};

/**
 * Map frontend memory to API memory item (for POST/PUT requests)
 */
export const mapMemoryToApiItem = (memory: Memory): Partial<MemoryItem> => {
  return {
    id: memory.id,
    name: memory.title,
    description: memory.description || '',
    category: memory.category,
    year: memory.year,
    imageUrl: memory.imageUrl,
  };
};

/**
 * Map collection item with memory details to frontend memory model
 */
export const mapCollectionItemToMemory = (
  item: MemoryItem & { dateAdded: string; personalNote?: string }
): Memory & { dateAdded: string; personalNote?: string } => {
  return {
    ...mapApiItemToMemory(item),
    dateAdded: item.dateAdded,
    personalNote: item.personalNote,
  };
}; 