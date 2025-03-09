import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialView?: 'login' | 'register';
}

const AuthModal = ({ isOpen, onClose, initialView = 'login' }: AuthModalProps) => {
  const [view, setView] = useState<'login' | 'register'>(initialView);
  const [isClosing, setIsClosing] = useState(false);
  const navigate = useNavigate();
  
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match this with the CSS transition duration
  };
  
  const handleViewChange = (newView: 'login' | 'register') => {
    setView(newView);
  };
  
  const handleSuccessfulAuth = () => {
    handleClose();
    navigate('/');
  };
  
  if (!isOpen) return null;
  
  return createPortal(
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      <div 
        className={`w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden transition-transform duration-300 ${
          isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="relative">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={handleClose}
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`flex-1 py-4 text-center font-medium ${
                view === 'login'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => handleViewChange('login')}
            >
              Sign In
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium ${
                view === 'register'
                  ? 'text-primary-600 border-b-2 border-primary-500'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
              onClick={() => handleViewChange('register')}
            >
              Create Account
            </button>
          </div>
          
          <div className="p-6">
            {view === 'login' ? (
              <Login onSuccess={handleSuccessfulAuth} isModal={true} />
            ) : (
              <Register onSuccess={handleSuccessfulAuth} isModal={true} />
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal; 