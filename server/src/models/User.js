import { v4 as uuidv4 } from 'uuid';

// In-memory storage for users
let users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 25,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

export const UserModel = {
  // Get all users
  getAll: () => {
    return users;
  },

  // Get user by ID
  getById: (id) => {
    return users.find(user => user.id === id);
  },

  // Create new user
  create: (userData) => {
    const newUser = {
      id: uuidv4(),
      ...userData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    users.push(newUser);
    return newUser;
  },

  // Update user
  update: (id, userData) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    users[userIndex] = {
      ...users[userIndex],
      ...userData,
      updatedAt: new Date().toISOString()
    };
    
    return users[userIndex];
  },

  // Delete user
  delete: (id) => {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      throw new Error('User not found');
    }
    
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    return deletedUser;
  }
}; 