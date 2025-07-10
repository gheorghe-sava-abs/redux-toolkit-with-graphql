import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchProduct,
  fetchProductsByCategory,
  updateProductStock,
  fetchProducts_name,
} from '../store/thunks/productsThunks';
import type { ProductInput } from '../store/models';
import { selectActionIsLoading } from '@/store/extensions';

export const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { products, selectedProduct } = useAppSelector(state => state.products);
  const fetchProductsIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchProducts_name));

  const [newProduct, setNewProduct] = useState<ProductInput>({ 
    name: '', 
    description: '', 
    price: 0, 
    category: '', 
    stock: 0 
  });

  // Load initial data
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Product operations
  const handleCreateProduct = () => {
    dispatch(createProduct(newProduct));
    setNewProduct({ name: '', description: '', price: 0, category: '', stock: 0 });
  };

  const handleUpdateProduct = (id: string, updates: Partial<ProductInput>) => {
    dispatch(updateProduct({ id, input: { ...selectedProduct, ...updates } as ProductInput }));
  };

  const handleDeleteProduct = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const handleFetchProduct = (id: string) => {
    dispatch(fetchProduct(id));
  };

  const handleFetchProductsByCategory = (category: string) => {
    dispatch(fetchProductsByCategory(category));
  };

  const handleUpdateProductStock = (id: string, quantity: number) => {
    dispatch(updateProductStock({ id, quantity }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Products Management</h1>
      {fetchProductsIsLoading && <div>Loading...</div>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        
        {/* Create Product Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Create Product</h3>
          <input
            type="text"
            placeholder="Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Description"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Price"
            value={newProduct.price || ''}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Stock"
            value={newProduct.stock || ''}
            onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleCreateProduct}
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Create Product
          </button>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-medium mb-2">Filter by Category</h3>
          <div className="space-x-2">
            {['Electronics', 'Kitchen', 'Sports'].map(category => (
              <button
                key={category}
                onClick={() => handleFetchProductsByCategory(category)}
                className="text-xs bg-purple-500 text-white px-2 py-1 rounded"
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div>
          <h3 className="font-medium mb-2">Products ({products.length})</h3>
          <div className="space-y-2">
            {products.map(product => (
              <div key={product.id} className="p-3 border rounded">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">{product.description}</div>
                <div className="text-sm text-gray-500">
                  ${product.price} | Stock: {product.stock} | {product.category}
                </div>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleFetchProduct(product.id)}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleUpdateProductStock(product.id, -1)}
                    className="text-xs bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    -1 Stock
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected Product Details */}
      {selectedProduct && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected Product Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(selectedProduct, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}; 