import { useState, useRef, useEffect, FormEvent } from 'react';
import Button from './Button';

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  suggestions?: string[];
  isLoading?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SearchBar = ({
  onSearch,
  placeholder = 'Search for memories...',
  initialValue = '',
  suggestions = [],
  isLoading = false,
  size = 'lg',
  className = '',
}: SearchBarProps) => {
  const [query, setQuery] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  
  // Filter suggestions based on query
  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5); // Limit to 5 suggestions
  
  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setShowSuggestions(false);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Size classes
  const sizeClasses = {
    sm: 'h-10 text-sm',
    md: 'h-12 text-base',
    lg: 'h-14 text-lg'
  };
  
  return (
    <div className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative flex items-center ${sizeClasses[size]}`}>
          {/* Search icon */}
          <div className="absolute left-4 flex items-center pointer-events-none">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-5 w-5' : 'h-6 w-6'} text-gray-400`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Input field */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className={`
              w-full pl-12 pr-16 py-2 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-white 
              rounded-full 
              border-2 border-gray-200 dark:border-gray-700 
              focus:border-primary-500 dark:focus:border-primary-400 
              focus:outline-none 
              focus:ring-2 focus:ring-primary-500/50 dark:focus:ring-primary-400/50
              transition-all duration-200
              ${isFocused ? 'shadow-lg' : 'shadow-md'}
              ${sizeClasses[size]}
            `}
            aria-label="Search"
          />
          
          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-16 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Clear search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
          
          {/* Search button */}
          <div className="absolute right-2">
            <Button
              type="submit"
              variant="primary"
              size={size === 'lg' ? 'md' : 'sm'}
              isLoading={isLoading}
              aria-label="Submit search"
            >
              Search
            </Button>
          </div>
        </div>
      </form>
      
      {/* Suggestions dropdown */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <div 
          ref={suggestionsRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 max-h-60 overflow-y-auto"
        >
          {filteredSuggestions.map((suggestion, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 