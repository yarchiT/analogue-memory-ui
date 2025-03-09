import { useState, ImgHTMLAttributes } from 'react';
import { MemoryCardSkeleton } from './Skeleton';

export type AspectRatio = '1:1' | '4:3' | '16:9' | '21:9';

export interface ResponsiveImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'onLoad' | 'onError'> {
  src: string;
  alt: string;
  aspectRatio?: AspectRatio;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string;
  showPlaceholder?: boolean;
  className?: string;
}

const ResponsiveImage = ({
  src,
  alt,
  aspectRatio = '16:9',
  objectFit = 'cover',
  fallbackSrc,
  showPlaceholder = true,
  className = '',
  ...props
}: ResponsiveImageProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Calculate aspect ratio padding
  const getAspectRatioPadding = (): string => {
    switch (aspectRatio) {
      case '1:1':
        return '100%';
      case '4:3':
        return '75%';
      case '16:9':
        return '56.25%';
      case '21:9':
        return '42.85%';
      default:
        return '56.25%'; // Default to 16:9
    }
  };
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };
  
  // Determine which source to use
  const imageSrc = hasError && fallbackSrc ? fallbackSrc : src;
  
  return (
    <div className="relative w-full overflow-hidden" style={{ paddingBottom: getAspectRatioPadding() }}>
      {/* Loading placeholder */}
      {isLoading && showPlaceholder && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-full h-full">
            <MemoryCardSkeleton />
          </div>
        </div>
      )}
      
      {/* Error placeholder */}
      {hasError && !fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-gray-400 dark:text-gray-500 text-center p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>Image could not be loaded</p>
          </div>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imageSrc}
        alt={alt}
        className={`absolute inset-0 w-full h-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'} ${className}`}
        style={{ objectFit }}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
        {...props}
      />
    </div>
  );
};

export default ResponsiveImage; 