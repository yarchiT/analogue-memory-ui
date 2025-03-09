import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { memories, categories } from '../mocks/memories';
import MemoryCard from '../components/MemoryCard';
import Button from '../components/Button';
import SearchBar from '../components/SearchBar';
import CategoryHeader from '../components/CategoryHeader';

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMemories, setFilteredMemories] = useState<typeof memories>([]);
  
  // Find the current category
  const category = categories.find(cat => cat.id === categoryId);
  
  // Simulate loading state
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [categoryId]);
  
  // Filter memories by category
  useEffect(() => {
    if (!categoryId) return;
    
    const filtered = memories.filter(memory => 
      memory.category.toLowerCase() === category?.name.toLowerCase()
    );
    
    setFilteredMemories(filtered);
  }, [categoryId, category]);
  
  // Handle search within category
  useEffect(() => {
    if (!searchQuery) {
      // If no search query, show all memories for this category
      const filtered = memories.filter(memory => 
        memory.category.toLowerCase() === category?.name.toLowerCase()
      );
      setFilteredMemories(filtered);
      return;
    }
    
    // Filter by search query and category
    const filtered = memories.filter(memory => 
      memory.category.toLowerCase() === category?.name.toLowerCase() &&
      (memory.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
       memory.year.toString().includes(searchQuery))
    );
    
    setFilteredMemories(filtered);
  }, [searchQuery, category]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleAddToCollection = (id: string) => {
    console.log('Added to collection:', id);
    // In a real app, this would add the item to the user's collection
  };
  
  const handleShare = (id: string) => {
    console.log('Shared:', id);
    // In a real app, this would open a share dialog
  };
  
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
              <div key={index} className="bg-gray-200 dark:bg-gray-700 rounded-lg h-80 animate-pulse"></div>
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