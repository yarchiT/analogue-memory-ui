import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MemoryCard from '../components/MemoryCard';
import ScrollableRow from '../components/ScrollableRow';
import Button from '../components/Button';
import { memories, categories, popularSearches } from '../mocks/memories';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log('Searching for:', query);
    // In a real app, this would navigate to search results
  };
  
  const handleAddToCollection = (id: string) => {
    console.log('Added to collection:', id);
    // In a real app, this would add the item to the user's collection
  };
  
  const handleShare = (id: string) => {
    console.log('Shared:', id);
    // In a real app, this would open a share dialog
  };
  
  const handleSeeAll = (category: string) => {
    console.log('See all for category:', category);
    // In a real app, this would navigate to the category page
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
      {/* Hero section with search */}
      <div className="relative bg-gradient-to-b from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-950">
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
        
        <div className="relative container mx-auto px-4 py-24 sm:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
            Rediscover Your Past
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-10">
            Explore and collect memories from your childhood and beyond. Connect with others through shared experiences.
          </p>
          
          <div className="w-full max-w-2xl">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search for movies, games, toys..." 
              suggestions={popularSearches}
            />
          </div>
          
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            {categories.slice(0, 4).map(category => (
              <Button 
                key={category.id}
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                onClick={() => handleSeeAll(category.name)}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Featured section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Featured Memories
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {memories.slice(0, 4).map(memory => (
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
      </div>
      
      {/* Category rows */}
      <div className="container mx-auto px-4 pb-16">
        {memoriesByCategory.map(category => (
          <ScrollableRow 
            key={category.id}
            title={category.name}
            onSeeAll={() => handleSeeAll(category.name)}
          >
            {category.items.map(memory => (
              <div key={memory.id} className="min-w-[250px] sm:min-w-[300px] flex-shrink-0 snap-start">
                <MemoryCard
                  id={memory.id}
                  title={memory.title}
                  imageUrl={memory.imageUrl}
                  category={memory.category}
                  year={memory.year}
                  onAddToCollection={handleAddToCollection}
                  onShare={handleShare}
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
    </div>
  );
};

export default Home; 