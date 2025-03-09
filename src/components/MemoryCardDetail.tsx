import { useEffect, useRef } from 'react';
import { Memory } from '../mocks/memories';
import Button from './Button';
import ResponsiveImage from './ResponsiveImage';

interface MemoryCardDetailProps {
  memory: Memory | undefined;
  similarItems: Memory[];
  isOpen: boolean;
  onClose: () => void;
  onAddToCollection: (id: string) => void;
  onShare: (id: string) => void;
  isInCollection?: boolean;
}

const MemoryCardDetail = ({
  memory,
  similarItems,
  isOpen,
  onClose,
  onAddToCollection,
  onShare
}: MemoryCardDetailProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !memory) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="memory-detail-title"
      >
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 id="memory-detail-title" className="text-xl font-bold text-gray-900 dark:text-white">
            Memory Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Image */}
            <div className="w-full md:w-1/2">
              <div className="rounded-lg overflow-hidden">
                <ResponsiveImage
                  src={memory?.imageUrl}
                  alt={memory?.title}
                  aspectRatio="16:9"
                  className="w-full h-auto"
                />
              </div>
            </div>

            {/* Details */}
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {memory?.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 text-sm font-medium rounded">
                  {memory?.category}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {memory?.year}
                </span>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {memory?.description || `A nostalgic ${memory?.category.toLowerCase()} from ${memory?.year}.`}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  onClick={() => onAddToCollection(memory?.id || '')}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  }
                >
                  Add to Collection
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => onShare(memory?.id || '')}
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

          {/* Similar Items */}
          {similarItems.length > 0 && (
            <div className="mt-10">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Similar Items
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarItems.map(item => (
                  <div 
                    key={item.id} 
                    className="bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200"
                    onClick={() => {
                      // In a real app, this would open the detail view for the similar item
                      console.log('Open similar item:', item.id);
                    }}
                  >
                    <div className="relative aspect-video">
                      <ResponsiveImage
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h5 className="font-medium text-gray-900 dark:text-white truncate">
                        {item.title}
                      </h5>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {item.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemoryCardDetail; 