import { gql } from '@apollo/client';

// User Queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      age
      createdAt
      updatedAt
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      age
      createdAt
      updatedAt
      orders {
        id
        total
        status
        createdAt
      }
    }
  }
`;

// Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      category
      stock
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      category
      stock
      createdAt
      updatedAt
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
  query GetProductsByCategory($category: String!) {
    productsByCategory(category: $category) {
      id
      name
      description
      price
      category
      stock
      createdAt
      updatedAt
    }
  }
`;

// Order Queries
export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      id
      userId
      total
      status
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      items {
        productId
        quantity
        price
        product {
          id
          name
          description
        }
      }
      shippingAddress {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      userId
      total
      status
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      items {
        productId
        quantity
        price
        product {
          id
          name
          description
        }
      }
      shippingAddress {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const GET_ORDERS_BY_USER = gql`
  query GetOrdersByUser($userId: ID!) {
    ordersByUser(userId: $userId) {
      id
      userId
      total
      status
      createdAt
      updatedAt
      items {
        productId
        quantity
        price
        product {
          id
          name
          description
        }
      }
    }
  }
`;

export const GET_ORDERS_BY_STATUS = gql`
  query GetOrdersByStatus($status: String!) {
    ordersByStatus(status: $status) {
      id
      userId
      total
      status
      createdAt
      updatedAt
      user {
        id
        name
        email
      }
      items {
        productId
        quantity
        price
      }
    }
  }
`;

// User Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      id
      name
      email
      age
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      id
      name
      email
      age
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      name
      email
    }
  }
`;

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      category
      stock
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      description
      price
      category
      stock
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($id: ID!) {
    deleteProduct(id: $id) {
      id
      name
      description
    }
  }
`;

export const UPDATE_PRODUCT_STOCK = gql`
  mutation UpdateProductStock($id: ID!, $quantity: Int!) {
    updateProductStock(id: $id, quantity: $quantity) {
      id
      name
      stock
      updatedAt
    }
  }
`;

// Order Mutations
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      id
      userId
      total
      status
      createdAt
      updatedAt
      items {
        productId
        quantity
        price
      }
      shippingAddress {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($id: ID!, $input: OrderInput!) {
    updateOrder(id: $id, input: $input) {
      id
      userId
      total
      status
      createdAt
      updatedAt
      items {
        productId
        quantity
        price
      }
      shippingAddress {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation DeleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      id
      userId
      total
      status
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      id
      status
      updatedAt
    }
  }
`;

export const ADD_ITEM_TO_ORDER = gql`
  mutation AddItemToOrder($id: ID!, $item: OrderItemInput!) {
    addItemToOrder(id: $id, item: $item) {
      id
      total
      items {
        productId
        quantity
        price
      }
      updatedAt
    }
  }
`; 