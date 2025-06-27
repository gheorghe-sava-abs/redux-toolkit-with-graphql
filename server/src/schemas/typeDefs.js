import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    createdAt: String!
    updatedAt: String!
    orders: [Order!]
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    category: String!
    stock: Int!
    createdAt: String!
    updatedAt: String!
  }

  type OrderItem {
    productId: ID!
    quantity: Int!
    price: Float!
    product: Product
  }

  type ShippingAddress {
    street: String!
    city: String!
    state: String!
    zipCode: String!
  }

  type Order {
    id: ID!
    userId: ID!
    user: User
    items: [OrderItem!]!
    total: Float!
    status: String!
    shippingAddress: ShippingAddress!
    createdAt: String!
    updatedAt: String!
  }

  input UserInput {
    name: String!
    email: String!
    age: Int
  }

  input ProductInput {
    name: String!
    description: String!
    price: Float!
    category: String!
    stock: Int!
  }

  input OrderItemInput {
    productId: ID!
    quantity: Int!
    price: Float!
  }

  input ShippingAddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
  }

  input OrderInput {
    userId: ID!
    items: [OrderItemInput!]!
    shippingAddress: ShippingAddressInput!
  }

  type Query {
    # User queries
    users: [User!]!
    user(id: ID!): User
    
    # Product queries
    products: [Product!]!
    product(id: ID!): Product
    productsByCategory(category: String!): [Product!]!
    
    # Order queries
    orders: [Order!]!
    order(id: ID!): Order
    ordersByUser(userId: ID!): [Order!]!
    ordersByStatus(status: String!): [Order!]!
  }

  type Mutation {
    # User mutations
    createUser(input: UserInput!): User!
    updateUser(id: ID!, input: UserInput!): User!
    deleteUser(id: ID!): User!
    
    # Product mutations
    createProduct(input: ProductInput!): Product!
    updateProduct(id: ID!, input: ProductInput!): Product!
    deleteProduct(id: ID!): Product!
    updateProductStock(id: ID!, quantity: Int!): Product!
    
    # Order mutations
    createOrder(input: OrderInput!): Order!
    updateOrder(id: ID!, input: OrderInput!): Order!
    deleteOrder(id: ID!): Order!
    updateOrderStatus(id: ID!, status: String!): Order!
    addItemToOrder(id: ID!, item: OrderItemInput!): Order!
  }
`; 