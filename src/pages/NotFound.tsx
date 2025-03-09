import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">Page Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          className="btn btn-primary"
          aria-label="Return to home page"
          tabIndex={0}
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound; 