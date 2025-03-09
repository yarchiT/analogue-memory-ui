import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

export interface CategoryHeaderProps {
  title: string;
  description?: string;
  showBackButton?: boolean;
  backButtonLabel?: string;
  backUrl?: string;
  children?: ReactNode;
}

const CategoryHeader = ({
  title,
  description,
  showBackButton = true,
  backButtonLabel = 'Back',
  backUrl = '/',
  children
}: CategoryHeaderProps) => {
  const navigate = useNavigate();
  
  const handleBack = () => {
    navigate(backUrl);
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-4">
          {showBackButton && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="mr-4"
              aria-label={`Go back to ${backUrl === '/' ? 'home' : 'previous page'}`}
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              }
            >
              {backButtonLabel}
            </Button>
          )}
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
        </div>
        
        {description && (
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-3xl">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );
};

export default CategoryHeader; 