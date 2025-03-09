import { Memory } from '../mocks/memories';

/**
 * Find similar items to a given memory based on category and year
 * @param memory The memory to find similar items for
 * @param allMemories All available memories
 * @param limit Maximum number of similar items to return
 * @returns Array of similar memories
 */
export const findSimilarItems = (
  memory: Memory,
  allMemories: Memory[],
  limit: number = 4
): Memory[] => {
  if (!memory) return [];

  // First, find items in the same category
  const sameCategoryItems = allMemories.filter(
    item => item.id !== memory.id && item.category === memory.category
  );

  // Then, prioritize items from the same year or close years
  const sortedByYear = [...sameCategoryItems].sort((a, b) => {
    const yearDiffA = Math.abs(a.year - memory.year);
    const yearDiffB = Math.abs(b.year - memory.year);
    return yearDiffA - yearDiffB;
  });

  // If we don't have enough items from the same category, add items from other categories
  let result = sortedByYear.slice(0, limit);
  
  if (result.length < limit) {
    // Find items from different categories but similar years
    const differentCategoryItems = allMemories.filter(
      item => item.id !== memory.id && 
              item.category !== memory.category &&
              !result.some(r => r.id === item.id)
    );
    
    const sortedDifferentCategory = differentCategoryItems.sort((a, b) => {
      const yearDiffA = Math.abs(a.year - memory.year);
      const yearDiffB = Math.abs(b.year - memory.year);
      return yearDiffA - yearDiffB;
    });
    
    result = [...result, ...sortedDifferentCategory.slice(0, limit - result.length)];
  }
  
  return result;
};

/**
 * Get a random selection of memories
 * @param memories Array of all memories
 * @param count Number of memories to return
 * @returns Array of randomly selected memories
 */
export const getRandomMemories = (memories: Memory[], count: number = 4): Memory[] => {
  const shuffled = [...memories].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}; 