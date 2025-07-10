import React, { useState } from 'react';
import { Navigation } from './components';
import { UsersPage, ProductsPage, OrdersPage } from './pages';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('users');

  const renderPage = () => {
    switch (currentPage) {
      case 'users':
        return <UsersPage />;
      case 'products':
        return <ProductsPage />;
      case 'orders':
        return <OrdersPage />;
      default:
        return <UsersPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="pt-4">
        {renderPage()}
      </main>
    </div>
  );
}; 