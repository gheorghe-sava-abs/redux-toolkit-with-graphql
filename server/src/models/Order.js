import { v4 as uuidv4 } from 'uuid';

// In-memory storage for orders
let orders = [
  {
    id: '1',
    userId: '1',
    items: [
      { productId: '1', quantity: 1, price: 1299.99 },
      { productId: '2', quantity: 2, price: 12.99 }
    ],
    total: 1325.97,
    status: 'pending',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    userId: '2',
    items: [
      { productId: '3', quantity: 1, price: 89.99 }
    ],
    total: 89.99,
    status: 'completed',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const OrderModel = {
  // Get all orders
  getAll: () => {
    return orders;
  },

  // Get order by ID
  getById: (id) => {
    return orders.find(order => order.id === id);
  },

  // Get orders by user ID
  getByUserId: (userId) => {
    return orders.filter(order => order.userId === userId);
  },

  // Get orders by status
  getByStatus: (status) => {
    return orders.filter(order => order.status === status);
  },

  // Create new order
  create: (orderData) => {
    const newOrder = {
      id: uuidv4(),
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.push(newOrder);
    return newOrder;
  },

  // Update order
  update: (id, orderData) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...orderData,
      updatedAt: new Date().toISOString()
    };
    
    return orders[orderIndex];
  },

  // Delete order
  delete: (id) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    const deletedOrder = orders[orderIndex];
    orders.splice(orderIndex, 1);
    return deletedOrder;
  },

  // Update order status
  updateStatus: (id, status) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    return orders[orderIndex];
  },

  // Add item to order
  addItem: (id, item) => {
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex === -1) {
      throw new Error('Order not found');
    }
    
    orders[orderIndex].items.push(item);
    orders[orderIndex].total = orders[orderIndex].items.reduce(
      (sum, item) => sum + (item.price * item.quantity), 0
    );
    orders[orderIndex].updatedAt = new Date().toISOString();
    
    return orders[orderIndex];
  }
}; 