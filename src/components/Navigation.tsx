import React from 'react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const pages = [
    { id: 'users', name: 'Users', color: 'bg-blue-500 hover:bg-blue-600' },
    { id: 'products', name: 'Products', color: 'bg-green-500 hover:bg-green-600' },
    { id: 'orders', name: 'Orders', color: 'bg-orange-500 hover:bg-orange-600' },
  ];

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">GraphQL + Redux Toolkit Demo</h1>
          </div>
          <div className="flex items-center space-x-4">
            {pages.map((page) => (
              <button
                key={page.id}
                onClick={() => onPageChange(page.id)}
                className={`px-4 py-2 rounded-md text-white font-medium transition-colors ${
                  currentPage === page.id 
                    ? page.color.replace('hover:', '') 
                    : page.color
                }`}
              >
                {page.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}; 