import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RegisterProps {
  onSuccess?: () => void;
  isModal?: boolean;
}

const Register = ({ onSuccess, isModal = false }: RegisterProps) => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth();
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthYear: '',
    country: '',
    region: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Birth year validation (optional)
    if (formData.birthYear && (
      isNaN(Number(formData.birthYear)) || 
      Number(formData.birthYear) < 1900 || 
      Number(formData.birthYear) > new Date().getFullYear()
    )) {
      newErrors.birthYear = 'Please enter a valid year';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        birthYear: formData.birthYear ? Number(formData.birthYear) : undefined,
        location: {
          country: formData.country || undefined,
          region: formData.region || undefined,
        },
      });
      
      // Call onSuccess if provided, otherwise navigate to home
      if (onSuccess) {
        onSuccess();
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Registration error:', err);
      // Error is handled by the auth context
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleLoginClick = (e: React.MouseEvent) => {
    if (isModal) {
      e.preventDefault();
      // This will be handled by the parent modal component
    }
  };
  
  const formContent = (
    <>
      {authError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
          {authError}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 ${
              errors.username ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="nostalgic90skid"
            aria-required="true"
            aria-invalid={!!errors.username}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.username}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 ${
              errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="you@example.com"
            aria-required="true"
            aria-invalid={!!errors.email}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 ${
              errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={!!errors.password}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.password}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="••••••••"
            aria-required="true"
            aria-invalid={!!errors.confirmPassword}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.confirmPassword}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="birthYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Birth Year (optional)
          </label>
          <input
            id="birthYear"
            name="birthYear"
            type="number"
            value={formData.birthYear}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 ${
              errors.birthYear ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder="1985"
            min="1900"
            max={new Date().getFullYear()}
            aria-invalid={!!errors.birthYear}
          />
          {errors.birthYear && (
            <p className="mt-1 text-sm text-red-600" role="alert">{errors.birthYear}</p>
          )}
        </div>
        
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Country (optional)
            </label>
            <input
              id="country"
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              placeholder="United States"
            />
          </div>
          
          <div>
            <label htmlFor="region" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Region (optional)
            </label>
            <input
              id="region"
              name="region"
              type="text"
              value={formData.region}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
              placeholder="California"
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn btn-primary py-2 mt-4 flex justify-center items-center"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </>
          ) : (
            'Create Account'
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-primary-600 hover:text-primary-500 dark:text-primary-400 font-medium" 
            tabIndex={0}
            onClick={handleLoginClick}
          >
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
  
  // If used in a modal, just return the form content
  if (isModal) {
    return formContent;
  }
  
  // Otherwise, wrap it in the page container
  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join Analogue Memory to start your collection
          </p>
        </div>
        
        {formContent}
      </div>
    </div>
  );
};

export default Register; 