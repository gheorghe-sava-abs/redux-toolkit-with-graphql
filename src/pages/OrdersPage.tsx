import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
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
import type { OrderInput, OrderItemInput } from '../store/models';
import { selectActionIsLoading } from '@/store/extensions';

export const OrdersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { orders, selectedOrder } = useAppSelector(state => state.orders);
  const { users } = useAppSelector(state => state.users);
  const fetchOrdersIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchOrders_name));

  const [newOrder, setNewOrder] = useState<OrderInput>({
    userId: '',
    items: [],
    shippingAddress: { street: '', city: '', state: '', zipCode: '' }
  });

  // Load initial data
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

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
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Orders Management</h1>
      {fetchOrdersIsLoading && <div>Loading...</div>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        
        {/* Order Filters */}
        <div className="mb-6">
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

      {/* Selected Order Details */}
      {selectedOrder && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected Order Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(selectedOrder, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}; 