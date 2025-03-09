import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MemoryCard from '../components/MemoryCard';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import CategoryHeader from '../components/CategoryHeader';
import useApi from '../hooks/useApi';
import { getCategoryById } from '../services/categoryService';
import { getItemsByCategory } from '../services/memoryService';
import { mapApiCategoryToCategory, mapApiItemToMemory } from '../utils/apiMappers';
import useCollection from '../hooks/useCollection';
import useToast from '../hooks/useToast';
import Skeleton from '../components/Skeleton';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMemories, setFilteredMemories] = useState<any[]>([]);
  
  // API data fetching
  const { 
    data: apiCategory, 
    isLoading: isCategoryLoading, 
    error: categoryError 
  } = useApi(() => getCategoryById(categoryId || ''), {
    dependencies: [categoryId]
  });
  
  const { 
    data: apiItems, 
    isLoading: isItemsLoading, 
    error: itemsError 
  } = useApi(() => getItemsByCategory(categoryId || ''), {
    dependencies: [categoryId]
  });
  
  // Convert API data to frontend models
  const category = apiCategory ? mapApiCategoryToCategory(apiCategory) : undefined;
  const memories = apiItems?.map(mapApiItemToMemory) || [];
  
  // Custom hooks
  const { 
    addToCollection, 
    isInCollection, 
    isRecentlyAdded 
  } = useCollection();
  
  const {
    showSuccessToast
  } = useToast();
  
  // Filter memories by search query
  useEffect(() => {
    if (!memories.length) return;
    
    if (!searchQuery) {
      setFilteredMemories(memories);
      return;
    }
    
    // Filter by search query
    const filtered = memories.filter(memory => 
      memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.year.toString().includes(searchQuery)
    );
    
    setFilteredMemories(filtered);
  }, [searchQuery, memories]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleAddToCollection = (id: string) => {
    addToCollection(id);
    showSuccessToast(`Added to your collection!`);
  };
  
  const handleShare = (id: string) => {
    console.log('Shared:', id);
    // In a real app, this would open a share dialog
  };
  
  // Loading state
  const isLoading = isCategoryLoading || isItemsLoading;
  
  // Error state
  const hasError = categoryError || itemsError;
  
  // If there's an error, show error message
  if (hasError && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {categoryError?.message || itemsError?.message || 'Failed to load data from the server.'}
          </p>
          <Button 
            variant="primary" 
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }
  
  // If category doesn't exist, redirect to home
  if (!category && !isLoading) {
    navigate('/');
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Category Header */}
      <CategoryHeader
        title={category?.name || 'Category'}
        description={category?.description}
        showBackButton={true}
        backButtonLabel="Back"
        backUrl="/"
      >
        {/* Search within category */}
        <div className="max-w-2xl">
          <SearchBar 
            onSearch={handleSearch} 
            placeholder={`Search in ${category?.name || 'this category'}...`} 
            isLoading={isLoading}
          />
        </div>
      </CategoryHeader>
      
      {/* Memory Grid */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-80 rounded-lg" />
            ))}
          </div>
        ) : (
          <>
            {filteredMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMemories.map(memory => (
                  <MemoryCard
                    key={memory.id}
                    id={memory.id}
                    title={memory.title}
                    imageUrl={memory.imageUrl}
                    category={memory.category}
                    year={memory.year}
                    isInCollection={isInCollection(memory.id)}
                    isRecentlyAdded={isRecentlyAdded(memory.id)}
                    onAddToCollection={handleAddToCollection}
                    onShare={handleShare}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">
                  No memories found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {searchQuery 
                    ? `No results found for "${searchQuery}" in this category.` 
                    : `There are no memories in the ${category?.name} category yet.`}
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryPage; 