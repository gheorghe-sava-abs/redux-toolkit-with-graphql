import { UserModel } from '../models/User.js';
import { ProductModel } from '../models/Product.js';
import { OrderModel } from '../models/Order.js';

export const resolvers = {
  Query: {
    // User queries
    users: () => {
      return UserModel.getAll();
    },
    user: (_, { id }) => {
      return UserModel.getById(id);
    },

    // Product queries
    products: () => {
      return ProductModel.getAll();
    },
    product: (_, { id }) => {
      return ProductModel.getById(id);
    },
    productsByCategory: (_, { category }) => {
      return ProductModel.getByCategory(category);
    },

    // Order queries
    orders: () => {
      return OrderModel.getAll();
    },
    order: (_, { id }) => {
      return OrderModel.getById(id);
    },
    ordersByUser: (_, { userId }) => {
      return OrderModel.getByUserId(userId);
    },
    ordersByStatus: (_, { status }) => {
      return OrderModel.getByStatus(status);
    }
  },

  Mutation: {
    // User mutations
    createUser: (_, { input }) => {
      return UserModel.create(input);
    },
    updateUser: (_, { id, input }) => {
      return UserModel.update(id, input);
    },
    deleteUser: (_, { id }) => {
      return UserModel.delete(id);
    },

    // Product mutations
    createProduct: (_, { input }) => {
      return ProductModel.create(input);
    },
    updateProduct: (_, { id, input }) => {
      return ProductModel.update(id, input);
    },
    deleteProduct: (_, { id }) => {
      return ProductModel.delete(id);
    },
    updateProductStock: (_, { id, quantity }) => {
      return ProductModel.updateStock(id, quantity);
    },

    // Order mutations
    createOrder: (_, { input }) => {
      // Calculate total from items
      const total = input.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      return OrderModel.create({ ...input, total });
    },
    updateOrder: (_, { id, input }) => {
      // Calculate total from items if items are provided
      if (input.items) {
        const total = input.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        return OrderModel.update(id, { ...input, total });
      }
      return OrderModel.update(id, input);
    },
    deleteOrder: (_, { id }) => {
      return OrderModel.delete(id);
    },
    updateOrderStatus: (_, { id, status }) => {
      return OrderModel.updateStatus(id, status);
    },
    addItemToOrder: (_, { id, item }) => {
      return OrderModel.addItem(id, item);
    }
  },

  // Field resolvers for relationships
  User: {
    orders: (parent) => {
      return OrderModel.getByUserId(parent.id);
    }
  },

  Order: {
    user: (parent) => {
      return UserModel.getById(parent.userId);
    }
  },

  OrderItem: {
    product: (parent) => {
      return ProductModel.getById(parent.productId);
    }
  }
}; 