import { useState } from 'react';
import Button from './Button';
import ResponsiveImage from './ResponsiveImage';

export interface MemoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  year?: number;
  onAddToCollection?: (id: string) => void;
  onShare?: (id: string) => void;
}

const MemoryCard = ({
  id,
  title,
  imageUrl,
  category,
  year,
  onAddToCollection,
  onShare
}: MemoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleAddToCollection = () => {
    if (onAddToCollection) {
      onAddToCollection(id);
    }
  };
  
  const handleShare = () => {
    if (onShare) {
      onShare(id);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Expand card or show details
    }
  };
  
  return (
    <div 
      className="relative group rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-white dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      aria-label={`Memory: ${title}`}
      onKeyDown={handleKeyDown}
    >
      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden">
        <ResponsiveImage 
          src={imageUrl} 
          alt={title}
          aspectRatio="16:9"
          className="transition-opacity duration-300"
        />
        
        {/* Overlay gradient for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Action buttons that appear on hover */}
        <div className={`absolute bottom-3 right-3 flex space-x-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {onAddToCollection && (
            <Button 
              variant="primary" 
              size="sm" 
              onClick={handleAddToCollection}
              aria-label="Add to collection"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              }
            >
              Add
            </Button>
          )}
          
          {onShare && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              aria-label="Share"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                </svg>
              }
            >
              Share
            </Button>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{title}</h3>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">{category}</span>
          {year && <span className="text-sm text-gray-500 dark:text-gray-400">{year}</span>}
        </div>
      </div>
    </div>
  );
};

export default MemoryCard; 