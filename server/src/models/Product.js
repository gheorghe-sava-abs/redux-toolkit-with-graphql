import { v4 as uuidv4 } from 'uuid';

// In-memory storage for products
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop for professionals',
    price: 1299.99,
    category: 'Electronics',
    stock: 50,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Coffee Mug',
    description: 'Ceramic coffee mug with handle',
    price: 12.99,
    category: 'Kitchen',
    stock: 200,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Running Shoes',
    description: 'Comfortable running shoes for athletes',
    price: 89.99,
    category: 'Sports',
    stock: 75,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const ProductModel = {
  // Get all products
  getAll: () => {
    return products;
  },

  // Get product by ID
  getById: (id) => {
    return products.find(product => product.id === id);
  },

  // Get products by category
  getByCategory: (category) => {
    return products.filter(product => product.category === category);
  },

  // Create new product
  create: (productData) => {
    const newProduct = {
      id: uuidv4(),
      ...productData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    products.push(newProduct);
    return newProduct;
  },

  // Update product
  update: (id, productData) => {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    products[productIndex] = {
      ...products[productIndex],
      ...productData,
      updatedAt: new Date().toISOString()
    };
    
    return products[productIndex];
  },

  // Delete product
  delete: (id) => {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    const deletedProduct = products[productIndex];
    products.splice(productIndex, 1);
    return deletedProduct;
  },

  // Update stock
  updateStock: (id, quantity) => {
    const productIndex = products.findIndex(product => product.id === id);
    if (productIndex === -1) {
      throw new Error('Product not found');
    }
    
    products[productIndex].stock += quantity;
    products[productIndex].updatedAt = new Date().toISOString();
    
    return products[productIndex];
  }
}; 