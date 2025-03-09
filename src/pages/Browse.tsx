import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MemoryCard from '../components/MemoryCard';
import SearchBar from '../components/SearchBar';
import CategoryHeader from '../components/CategoryHeader';
import useApi from '../hooks/useApi';
import { getAllCategories } from '../services/categoryService';
import { getAllItems } from '../services/memoryService';
import { mapApiCategoryToCategory, mapApiItemToMemory } from '../utils/apiMappers';
import useCollection from '../hooks/useCollection';
import useToast from '../hooks/useToast';
import Skeleton from '../components/Skeleton';
import Button from '../components/Button';

const Browse = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMemories, setFilteredMemories] = useState<any[]>([]);
  
  // API data fetching
  const { 
    data: apiCategories, 
    isLoading: isCategoriesLoading, 
    error: categoriesError 
  } = useApi(getAllCategories);
  
  const { 
    data: apiItems, 
    isLoading: isItemsLoading, 
    error: itemsError 
  } = useApi(getAllItems);
  
  // Convert API data to frontend models
  const categories = apiCategories?.map(mapApiCategoryToCategory) || [];
  const memories = apiItems?.map(mapApiItemToMemory) || [];
  
  // Add "All" category to the list
  const allCategories = [
    { id: 'all', name: 'All Items', description: 'Browse all memories across categories' },
    ...categories
  ];
  
  // Custom hooks
  const { 
    addToCollection, 
    isInCollection, 
    isRecentlyAdded 
  } = useCollection();
  
  const {
    showSuccessToast
  } = useToast();
  
  // Filter memories by category and search query
  useEffect(() => {
    if (!memories.length) return;
    
    let filtered = memories;
    
    // Filter by category if not "all"
    if (activeCategory !== 'all') {
      const category = categories.find(cat => cat.id === activeCategory);
      filtered = memories.filter(memory => 
        memory.category.toLowerCase() === category?.name.toLowerCase()
      );
    }
    
    // Filter by search query if provided
    if (searchQuery) {
      filtered = filtered.filter(memory => 
        memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        memory.year.toString().includes(searchQuery) ||
        memory.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredMemories(filtered);
  }, [activeCategory, searchQuery, memories, categories]);
  
  // Set initial filtered memories
  useEffect(() => {
    if (memories.length) {
      setFilteredMemories(memories);
    }
  }, [memories]);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
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
  
  // Get current category
  const currentCategory = allCategories.find(cat => cat.id === activeCategory);
  
  // Loading state
  const isLoading = isCategoriesLoading || isItemsLoading;
  
  // Error state
  const hasError = categoriesError || itemsError;
  
  // If there's an error, show error message
  if (hasError && !isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {categoriesError?.message || itemsError?.message || 'Failed to load data from the server.'}
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
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <CategoryHeader
        title="Browse Memories"
        description={currentCategory?.description}
        showBackButton={true}
        backButtonLabel="Home"
        backUrl="/"
      >
        {/* Category filters */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {allCategories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-300 ${
                  activeCategory === category.id
                    ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                aria-pressed={activeCategory === category.id}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Search bar */}
        <div className="max-w-2xl">
          <SearchBar
            onSearch={handleSearch}
            placeholder={`Search ${activeCategory === 'all' ? 'all memories' : `in ${currentCategory?.name}`}...`}
            isLoading={isLoading}
          />
        </div>
      </CategoryHeader>
      
      {/* Items grid */}
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
                    ? `No results found for "${searchQuery}" ${activeCategory !== 'all' ? `in ${currentCategory?.name}` : ''}.` 
                    : `There are no memories ${activeCategory !== 'all' ? `in the ${currentCategory?.name} category` : ''} yet.`}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Browse; 