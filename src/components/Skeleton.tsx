import { HTMLAttributes } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  animate?: boolean;
}

const Skeleton = ({
  width,
  height,
  borderRadius = '0.375rem',
  animate = true,
  className = '',
  ...props
}: SkeletonProps) => {
  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '1rem',
    borderRadius,
  };
  
  const animationClass = animate ? 'animate-pulse' : '';
  
  return (
    <div 
      className={`bg-gray-200 dark:bg-gray-700 ${animationClass} ${className}`}
      style={style}
      {...props}
    />
  );
};

export const MemoryCardSkeleton = () => {
  return (
    <div className="rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-800 flex flex-col">
      {/* Image skeleton */}
      <Skeleton height="200px" borderRadius="0" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton width="70%" height="1.5rem" />
        <div className="flex justify-between">
          <Skeleton width="40%" height="1rem" />
          <Skeleton width="20%" height="1rem" />
        </div>
      </div>
    </div>
  );
};

export const TextSkeleton = ({ lines = 3, lastLineWidth = '60%' }) => {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines - 1 }).map((_, index) => (
        <Skeleton key={index} height="1rem" />
      ))}
      <Skeleton width={lastLineWidth} height="1rem" />
    </div>
  );
};

export const SearchBarSkeleton = () => {
  return (
    <div className="flex items-center">
      <Skeleton width="100%" height="3rem" borderRadius="9999px" />
    </div>
  );
};

export default Skeleton; 