import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MemoryCard from '../components/MemoryCard';
import ScrollableRow from '../components/ScrollableRow';
import Button from '../components/Button';
import ResponsiveImage from '../components/ResponsiveImage';
import MemoryCardDetail from '../components/MemoryCardDetail';
import ShareModal from '../components/ShareModal';
import Toast from '../components/Toast';
import { memories, categories, popularSearches } from '../mocks/memories';
import useCollection from '../hooks/useCollection';
import useShare from '../hooks/useShare';
import useToast from '../hooks/useToast';
import { findSimilarItems } from '../utils/similarItems';

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredMemory, setFeaturedMemory] = useState(memories[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMemory, setSelectedMemory] = useState<string | null>(null);
  
  // Custom hooks
  const { 
    collection, 
    addToCollection, 
    isInCollection, 
    isRecentlyAdded 
  } = useCollection();
  
  const {
    isShareModalOpen,
    openShareModal,
    closeShareModal,
    getShareMemory,
    shareViaWebAPI,
    shareViaPlatform
  } = useShare(memories);
  
  const {
    toast,
    hideToast,
    showSuccessToast
  } = useToast();
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Randomly select a featured memory every 30 seconds
  useEffect(() => {
    const selectRandomFeaturedMemory = () => {
      const randomIndex = Math.floor(Math.random() * memories.length);
      setFeaturedMemory(memories[randomIndex]);
    };
    
    // Initial selection
    selectRandomFeaturedMemory();
    
    // Set interval for changing featured memory
    const interval = setInterval(selectRandomFeaturedMemory, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // In a real app, this would navigate to search results
  };
  
  const handleAddToCollection = (id: string) => {
    addToCollection(id);
    showSuccessToast(`Added to your collection!`);
  };
  
  const handleShare = (id: string) => {
    openShareModal(id);
  };
  
  const handleCardClick = (id: string) => {
    setSelectedMemory(id);
  };
  
  const handleCloseDetail = () => {
    setSelectedMemory(null);
  };
  
  const handleCategoryClick = (categoryId: string) => {
    navigate(`/category/${categoryId}`);
  };
  
  // Get the selected memory details
  const getSelectedMemoryDetails = () => {
    if (!selectedMemory) return null;
    return memories.find(memory => memory.id === selectedMemory);
  };
  
  // Get similar items for the selected memory
  const getSimilarItems = () => {
    const memory = getSelectedMemoryDetails();
    if (!memory) return [];
    return findSimilarItems(memory, memories);
  };
  
  // Group memories by category
  const memoriesByCategory = categories.map(category => {
    return {
      ...category,
      items: memories.filter(memory => 
        memory.category.toLowerCase() === category.name.toLowerCase()
      )
    };
  }).filter(category => category.items.length > 0);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero section with featured memory */}
      <div className="relative h-[70vh] min-h-[500px] w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <ResponsiveImage 
            src={featuredMemory.imageUrl} 
            alt={featuredMemory.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-16">
          <div className="max-w-2xl">
            <span className="inline-block px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded mb-3">
              Featured
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-3">
              {featuredMemory.title}
            </h1>
            <p className="text-lg text-white/90 mb-6">
              {featuredMemory.description || `From ${featuredMemory.category} (${featuredMemory.year})`}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={isInCollection(featuredMemory.id) ? "success" : "primary"}
                size="lg"
                onClick={() => handleAddToCollection(featuredMemory.id)}
                icon={
                  isInCollection(featuredMemory.id) ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  )
                }
              >
                {isInCollection(featuredMemory.id) ? 'In Collection' : 'Add to Collection'}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => handleShare(featuredMemory.id)}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                }
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search section */}
      <div className="relative bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-3xl mx-auto">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for movies, games, toys..." 
              suggestions={popularSearches}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
      
      {/* Category buttons */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map(category => (
            <Button 
              key={category.id}
              variant="outline"
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      {/* Category rows */}
      <div className="container mx-auto px-4 pb-16">
        {memoriesByCategory.map(category => (
          <ScrollableRow 
            key={category.id}
            title={category.name}
            categoryId={category.id}
            seeAllLabel="See All"
          >
            {category.items.map(memory => (
              <div key={memory.id} className="min-w-[250px] sm:min-w-[300px] flex-shrink-0 snap-start">
                <MemoryCard
                  id={memory.id}
                  title={memory.title}
                  imageUrl={memory.imageUrl}
                  category={memory.category}
                  year={memory.year}
                  isInCollection={isInCollection(memory.id)}
                  isRecentlyAdded={isRecentlyAdded(memory.id)}
                  onAddToCollection={handleAddToCollection}
                  onShare={handleShare}
                  onClick={handleCardClick}
                />
              </div>
            ))}
          </ScrollableRow>
        ))}
      </div>
      
      {/* Call to action */}
      <div className="bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Start Building Your Collection
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Sign up today to create your personal memory library and connect with others.
          </p>
          <Link to="/login">
            <Button variant="primary" size="lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Memory detail modal */}
      {selectedMemory && (
        <MemoryCardDetail
          memory={getSelectedMemoryDetails()!}
          similarItems={getSimilarItems()}
          isOpen={!!selectedMemory}
          onClose={handleCloseDetail}
          onAddToCollection={handleAddToCollection}
          onShare={handleShare}
        />
      )}
      
      {/* Share modal */}
      <ShareModal
        memory={getShareMemory()}
        isOpen={isShareModalOpen}
        onClose={closeShareModal}
        onShareViaPlatform={shareViaPlatform}
        onShareViaWebAPI={shareViaWebAPI}
      />
      
      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
};

export default Home; 