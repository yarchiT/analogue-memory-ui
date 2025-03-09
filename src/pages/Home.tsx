import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">
          Welcome to Analogue Memory
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Rediscover your past and connect with others through shared memories.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/browse" 
            className="btn btn-primary"
            aria-label="Browse memories"
            tabIndex={0}
          >
            Browse Memories
          </Link>
          <Link 
            to="/login" 
            className="btn btn-outline"
            aria-label="Sign in to your account"
            tabIndex={0}
          >
            Sign In
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Catalog Your Memories</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Build your personal library of nostalgic items from the past.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Find Connections</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover others who share your memories and experiences.
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-3">Explore the Past</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Browse through a curated collection of nostalgic items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 