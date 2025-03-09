import { ReactNode, useRef } from 'react';
import Button from './Button';

export interface ScrollableRowProps {
  title: string;
  children: ReactNode;
  onSeeAll?: () => void;
  seeAllLabel?: string;
}

const ScrollableRow = ({
  title,
  children,
  onSeeAll,
  seeAllLabel = 'See All'
}: ScrollableRowProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.75;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        
        {onSeeAll && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSeeAll}
            aria-label={`See all ${title}`}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            }
            iconPosition="right"
          >
            {seeAllLabel}
          </Button>
        )}
      </div>
      
      <div className="relative group">
        {/* Left scroll button */}
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
          onClick={handleScrollLeft}
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory gap-4 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {children}
        </div>
        
        {/* Right scroll button */}
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 focus:opacity-100"
          onClick={handleScrollRight}
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700 dark:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScrollableRow; 