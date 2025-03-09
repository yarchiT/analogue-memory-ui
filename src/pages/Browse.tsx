import { useState } from 'react';

const Browse = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Placeholder categories
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'toys', name: 'Toys & Games' },
    { id: 'music', name: 'Music' },
    { id: 'movies', name: 'Movies & TV' },
    { id: 'tech', name: 'Technology' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'food', name: 'Food & Drinks' },
  ];
  
  // Placeholder items
  const items = [
    { id: 1, name: 'Tamagotchi', category: 'toys', year: '1996', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Tamagotchi' },
    { id: 2, name: 'Walkman', category: 'tech', year: '1979', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Walkman' },
    { id: 3, name: 'Rubik\'s Cube', category: 'toys', year: '1974', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Rubik%27s+Cube' },
    { id: 4, name: 'Nirvana - Nevermind', category: 'music', year: '1991', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Nevermind' },
    { id: 5, name: 'The Breakfast Club', category: 'movies', year: '1985', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Breakfast+Club' },
    { id: 6, name: 'Polaroid Camera', category: 'tech', year: '1948', imageUrl: 'https://placehold.co/300x300/e0f2fe/0284c7?text=Polaroid' },
  ];
  
  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory);
  
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };
  
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Browse Memories</h1>
      
      {/* Category filters */}
      <div className="mb-8 overflow-x-auto">
        <div className="flex space-x-2 pb-2">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
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
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search memories..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
            aria-label="Search memories"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Items grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.year}</p>
            </div>
          </div>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No items found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default Browse; 