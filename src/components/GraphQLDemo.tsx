import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchUser,
  fetchUsers_name,
} from '../store/thunks/usersThunks';
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
import {
  fetchOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  fetchOrder,
  fetchOrdersByUser,
  fetchOrdersByStatus,
  updateOrderStatus,
  addItemToOrder,
  fetchOrders_name,
} from '../store/thunks/ordersThunks';
import type { UserInput, ProductInput, OrderInput, OrderItemInput } from '../store/models';
import { selectActionIsLoading } from '@/store/extensions';

export const GraphQLDemo: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector(state => state.users);
  const { products, selectedProduct } = useAppSelector(state => state.products);
  const { orders, selectedOrder } = useAppSelector(state => state.orders);

  const fetchOrdersIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchOrders_name));
  const fetchUsersIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchUsers_name));
  const fetchProductsIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchProducts_name));

  const [newUser, setNewUser] = useState<UserInput>({ name: '', email: '', age: 0 });
  const [newProduct, setNewProduct] = useState<ProductInput>({ name: '', description: '', price: 0, category: '', stock: 0 });
  const [newOrder, setNewOrder] = useState<OrderInput>({
    userId: '',
    items: [],
    shippingAddress: { street: '', city: '', state: '', zipCode: '' }
  });

  // Load initial data
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchProducts());
    dispatch(fetchOrders());
  }, [dispatch]);

  // User operations
  const handleCreateUser = () => {
    dispatch(createUser(newUser));
    setNewUser({ name: '', email: '', age: 0 });
  };

  const handleUpdateUser = (id: string, updates: Partial<UserInput>) => {
    dispatch(updateUser({ id, input: { ...selectedUser, ...updates } as UserInput }));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleFetchUser = (id: string) => {
    dispatch(fetchUser(id));
  };

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

  // Order operations
  const handleCreateOrder = () => {
    dispatch(createOrder(newOrder));
    setNewOrder({
      userId: '',
      items: [],
      shippingAddress: { street: '', city: '', state: '', zipCode: '' }
    });
  };

  const handleUpdateOrder = (id: string, updates: Partial<OrderInput>) => {
    dispatch(updateOrder({ id, input: { ...selectedOrder, ...updates } as OrderInput }));
  };

  const handleDeleteOrder = (id: string) => {
    dispatch(deleteOrder(id));
  };

  const handleFetchOrder = (id: string) => {
    dispatch(fetchOrder(id));
  };

  const handleFetchOrdersByUser = (userId: string) => {
    dispatch(fetchOrdersByUser(userId));
  };

  const handleFetchOrdersByStatus = (status: string) => {
    dispatch(fetchOrdersByStatus(status));
  };

  const handleUpdateOrderStatus = (id: string, status: string) => {
    dispatch(updateOrderStatus({ id, status }));
  };

  const handleAddItemToOrder = (orderId: string, item: OrderItemInput) => {
    dispatch(addItemToOrder({ id: orderId, item }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">GraphQL + Redux Toolkit Demo</h1>
      {(fetchOrdersIsLoading || fetchUsersIsLoading || fetchProductsIsLoading) && <div>Loading...</div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Users Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          
          {/* Create User Form */}
          <div className="mb-4 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Create User</h3>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="w-full mb-2 p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Age"
              value={newUser.age || ''}
              onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) || 0 })}
              className="w-full mb-2 p-2 border rounded"
            />
            <button
              onClick={handleCreateUser}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create User
            </button>
          </div>

          {/* Users List */}
          <div>
            <h3 className="font-medium mb-2">Users ({users.length})</h3>
            <div className="space-y-2">
              {users.map(user => (
                <div key={user.id} className="p-3 border rounded">
                  <div className="font-medium">{user.name}</div>
                  <div className="text-sm text-gray-600">{user.email}</div>
                  <div className="text-sm text-gray-500">Age: {user.age}</div>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleFetchUser(user.id)}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
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

        {/* Products Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
          
          {/* Create Product Form */}
          <div className="mb-4 p-4 bg-gray-50 rounded">
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
          <div className="mb-4">
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

        {/* Orders Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          
          {/* Order Filters */}
          <div className="mb-4">
            <h3 className="font-medium mb-2">Filter Orders</h3>
            <div className="space-x-2 mb-2">
              {['pending', 'completed', 'shipped'].map(status => (
                <button
                  key={status}
                  onClick={() => handleFetchOrdersByStatus(status)}
                  className="text-xs bg-orange-500 text-white px-2 py-1 rounded"
                >
                  {status}
                </button>
              ))}
            </div>
            <div className="space-x-2">
              {users.slice(0, 2).map(user => (
                <button
                  key={user.id}
                  onClick={() => handleFetchOrdersByUser(user.id)}
                  className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {user.name}'s Orders
                </button>
              ))}
            </div>
          </div>

          {/* Orders List */}
          <div>
            <h3 className="font-medium mb-2">Orders ({orders.length})</h3>
            <div className="space-y-2">
              {orders.map(order => (
                <div key={order.id} className="p-3 border rounded">
                  <div className="font-medium">Order #{order.id.slice(0, 8)}</div>
                  <div className="text-sm text-gray-600">
                    User: {order.user?.name || order.userId}
                  </div>
                  <div className="text-sm text-gray-500">
                    Total: ${order.total} | Status: {order.status}
                  </div>
                  <div className="text-sm text-gray-500">
                    Items: {order.items.length}
                  </div>
                  <div className="mt-2 space-x-2">
                    <button
                      onClick={() => handleFetchOrder(order.id)}
                      className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(order.id, 'shipped')}
                      className="text-xs bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Ship
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
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
      </div>

      {/* Selected Item Details */}
      {(selectedUser || selectedProduct || selectedOrder) && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected Item Details</h2>
          
          {selectedUser && (
            <div className="mb-4">
              <h3 className="font-medium">Selected User</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(selectedUser, null, 2)}
              </pre>
            </div>
          )}
          
          {selectedProduct && (
            <div className="mb-4">
              <h3 className="font-medium">Selected Product</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(selectedProduct, null, 2)}
              </pre>
            </div>
          )}
          
          {selectedOrder && (
            <div className="mb-4">
              <h3 className="font-medium">Selected Order</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                {JSON.stringify(selectedOrder, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 