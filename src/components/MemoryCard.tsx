import { useState } from 'react';
import Button from './Button';
import ResponsiveImage from './ResponsiveImage';

export interface MemoryCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  year?: number;
  isInCollection?: boolean;
  isRecentlyAdded?: boolean;
  onAddToCollection?: (id: string) => void;
  onShare?: (id: string) => void;
  onClick?: (id: string) => void;
}

const MemoryCard = ({
  id,
  title,
  imageUrl,
  category,
  year,
  isInCollection = false,
  isRecentlyAdded = false,
  onAddToCollection,
  onShare,
  onClick
}: MemoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const handleAddToCollection = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onAddToCollection) {
      onAddToCollection(id);
    }
  };
  
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    if (onShare) {
      onShare(id);
    }
  };
  
  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };
  
  return (
    <div 
      className={`
        relative group rounded-lg overflow-hidden shadow-md 
        transition-all duration-300 
        ${isHovered ? 'scale-105 shadow-xl z-10' : ''} 
        ${isPressed ? 'scale-95' : ''} 
        bg-white dark:bg-gray-800 
        cursor-pointer
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      onClick={handleClick}
      tabIndex={0}
      aria-label={`Memory: ${title}`}
      onKeyDown={handleKeyDown}
      role="button"
    >
      {/* Image container with aspect ratio */}
      <div className="relative overflow-hidden">
        <ResponsiveImage 
          src={imageUrl} 
          alt={title}
          aspectRatio="16:9"
          className={`transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}
        />
        
        {/* Overlay gradient for better text visibility */}
        <div 
          className={`
            absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
            transition-opacity duration-300 
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `} 
        />
        
        {/* Action buttons that appear on hover */}
        <div 
          className={`
            absolute bottom-3 right-3 flex space-x-2 
            transition-all duration-300 
            ${isHovered ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}
          `}
        >
          {onAddToCollection && (
            <Button 
              variant={isInCollection ? "success" : "primary"} 
              size="sm" 
              onClick={handleAddToCollection}
              aria-label={isInCollection ? "Remove from collection" : "Add to collection"}
              className={`
                transition-all duration-300
                ${isRecentlyAdded ? 'animate-pulse' : ''}
              `}
              icon={
                isInCollection ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                )
              }
            >
              {isInCollection ? 'Added' : 'Add'}
            </Button>
          )}
          
          {onShare && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShare}
              aria-label="Share"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
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
      
      {/* Collection badge */}
      {isInCollection && (
        <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          In Collection
        </div>
      )}
    </div>
  );
};

export default MemoryCard; 