import { ReactNode, useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { initializeTheme, setThemePreference, ThemeMode } from '../utils/theme';
import Button from './Button';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  
  // Close the menu when the route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location.pathname]);
  
  // Initialize theme
  useEffect(() => {
    initializeTheme();
    const storedTheme = localStorage.getItem('theme') as ThemeMode || 'system';
    setTheme(storedTheme);
  }, []);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Handle click outside profile menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleThemeChange = (newTheme: ThemeMode) => {
    setTheme(newTheme);
    setThemePreference(newTheme);
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // Mock user data - in a real app this would come from auth context
  const user = {
    name: 'Guest User',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    isLoggedIn: false
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-md' 
            : location.pathname === '/' 
              ? 'bg-transparent' 
              : 'bg-white dark:bg-gray-900'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and navigation */}
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center" aria-label="Home page" tabIndex={0}>
                <span className={`text-xl font-bold ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-white'
                }`}>
                  Analogue Memory
                </span>
              </Link>
              
              {/* Desktop navigation */}
              <nav className="hidden md:ml-6 md:flex md:space-x-4">
                <Link 
                  to="/browse" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/browse' 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : isScrolled || location.pathname !== '/' 
                        ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                        : 'text-white/90 hover:text-white'
                  }`}
                  aria-current={location.pathname === '/browse' ? 'page' : undefined}
                  tabIndex={0}
                >
                  Browse
                </Link>
                <Link 
                  to="/categories" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/categories' 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : isScrolled || location.pathname !== '/' 
                        ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                        : 'text-white/90 hover:text-white'
                  }`}
                  aria-current={location.pathname === '/categories' ? 'page' : undefined}
                  tabIndex={0}
                >
                  Categories
                </Link>
                <Link 
                  to="/collections" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/collections' 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : isScrolled || location.pathname !== '/' 
                        ? 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
                        : 'text-white/90 hover:text-white'
                  }`}
                  aria-current={location.pathname === '/collections' ? 'page' : undefined}
                  tabIndex={0}
                >
                  My Collection
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center">
              {/* Theme toggle */}
              <button
                onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
                className={`p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${
                  isScrolled || location.pathname !== '/' 
                    ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' 
                    : 'text-white/80 hover:text-white'
                }`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
              
              {/* Profile dropdown */}
              <div className="ml-4 relative" ref={profileMenuRef}>
                <div>
                  <button
                    onClick={toggleProfileMenu}
                    className="flex items-center space-x-2 focus:outline-none"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                  >
                    <span className={`text-sm font-medium hidden sm:block ${
                      isScrolled || location.pathname !== '/' 
                        ? 'text-gray-700 dark:text-gray-300' 
                        : 'text-white'
                    }`}>
                      {user.name}
                    </span>
                    <div className="h-8 w-8 rounded-full overflow-hidden border-2 border-white dark:border-gray-700">
                      <img 
                        src={user.avatar} 
                        alt="User avatar" 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <svg 
                      className={`h-5 w-5 ${
                        isScrolled || location.pathname !== '/' 
                          ? 'text-gray-400' 
                          : 'text-white/80'
                      }`} 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                
                {/* Profile dropdown menu */}
                {isProfileMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-gray-700">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                    </div>
                    <div className="py-1">
                      {user.isLoggedIn ? (
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => console.log('Sign out')}
                        >
                          Sign out
                        </button>
                      ) : (
                        <Link
                          to="/login"
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          Sign in
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Mobile menu button */}
              <div className="flex md:hidden ml-4">
                <button
                  onClick={toggleMenu}
                  className={`inline-flex items-center justify-center p-2 rounded-md ${
                    isScrolled || location.pathname !== '/' 
                      ? 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200' 
                      : 'text-white/80 hover:text-white'
                  } focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500`}
                  aria-expanded={isMenuOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/browse"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/browse'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                aria-current={location.pathname === '/browse' ? 'page' : undefined}
              >
                Browse
              </Link>
              <Link
                to="/categories"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/categories'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                aria-current={location.pathname === '/categories' ? 'page' : undefined}
              >
                Categories
              </Link>
              <Link
                to="/collections"
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === '/collections'
                    ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-400'
                    : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
                aria-current={location.pathname === '/collections' ? 'page' : undefined}
              >
                My Collection
              </Link>
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                &copy; {new Date().getFullYear()} Analogue Memory. All rights reserved.
              </span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 