# GraphQL API Server

A Node.js GraphQL server built with Apollo Server and Express, providing CRUD operations for Users, Products, and Orders.

## Features

- **Three Models**: User, Product, and Order with full CRUD operations
- **GraphQL API**: Type-safe queries and mutations
- **In-Memory Storage**: Simple data persistence (can be replaced with database)
- **CORS Enabled**: Configured for React frontend
- **Health Check**: REST endpoint for monitoring
- **Error Handling**: Comprehensive error formatting

## Quick Start

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Start the Server**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

3. **Access the API**
   - GraphQL Playground: http://localhost:4000/graphql
   - Health Check: http://localhost:4000/health

## API Endpoints

### GraphQL Endpoint
- **URL**: `http://localhost:4000/graphql`
- **Method**: POST
- **Content-Type**: application/json

### Health Check
- **URL**: `http://localhost:4000/health`
- **Method**: GET
- **Response**: Server status and timestamp

## GraphQL Schema

### Types

#### User
```graphql
type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  createdAt: String!
  updatedAt: String!
  orders: [Order!]
}
```

#### Product
```graphql
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
```

#### Order
```graphql
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
```

## Example Queries

### Get All Users
```graphql
query {
  users {
    id
    name
    email
    age
    createdAt
  }
}
```

### Get User with Orders
```graphql
query {
  user(id: "1") {
    id
    name
    email
    orders {
      id
      total
      status
      items {
        productId
        quantity
        price
        product {
          name
          description
        }
      }
    }
  }
}
```

### Get Products by Category
```graphql
query {
  productsByCategory(category: "Electronics") {
    id
    name
    description
    price
    stock
  }
}
```

### Get Orders by Status
```graphql
query {
  ordersByStatus(status: "pending") {
    id
    userId
    total
    status
    user {
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
```

## Example Mutations

### Create User
```graphql
mutation {
  createUser(input: {
    name: "Alice Johnson"
    email: "alice@example.com"
    age: 28
  }) {
    id
    name
    email
    age
    createdAt
  }
}
```

### Create Product
```graphql
mutation {
  createProduct(input: {
    name: "Wireless Headphones"
    description: "High-quality wireless headphones with noise cancellation"
    price: 199.99
    category: "Electronics"
    stock: 100
  }) {
    id
    name
    description
    price
    category
    stock
  }
}
```

### Create Order
```graphql
mutation {
  createOrder(input: {
    userId: "1"
    items: [
      {
        productId: "1"
        quantity: 2
        price: 1299.99
      }
    ]
    shippingAddress: {
      street: "789 Pine St"
      city: "Chicago"
      state: "IL"
      zipCode: "60601"
    }
  }) {
    id
    userId
    total
    status
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
```

### Update Product Stock
```graphql
mutation {
  updateProductStock(id: "1", quantity: -5) {
    id
    name
    stock
    updatedAt
  }
}
```

### Update Order Status
```graphql
mutation {
  updateOrderStatus(id: "1", status: "shipped") {
    id
    status
    updatedAt
  }
}
```

## Integration with React Frontend

The server is configured to work with a React frontend running on `http://localhost:3000`. You can use GraphQL clients like:

- **Apollo Client**: Most popular GraphQL client
- **urql**: Lightweight GraphQL client
- **Relay**: Facebook's GraphQL client

### Example Apollo Client Setup

```javascript
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
```

## Development

### Project Structure
```
server/
├── src/
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Order.js
│   ├── resolvers/
│   │   └── index.js
│   ├── schemas/
│   │   └── typeDefs.js
│   └── index.js
├── package.json
└── README.md
```

### Adding New Features

1. **New Model**: Create a new model file in `src/models/`
2. **Schema**: Add types and inputs to `src/schemas/typeDefs.js`
3. **Resolvers**: Add queries and mutations to `src/resolvers/index.js`
4. **Relationships**: Add field resolvers for related data

### Error Handling

The server includes comprehensive error handling:
- GraphQL errors are logged and formatted
- Model errors are caught and returned as GraphQL errors
- CORS is configured for cross-origin requests

## Production Considerations

For production deployment, consider:

1. **Database**: Replace in-memory storage with a real database
2. **Authentication**: Add JWT or session-based authentication
3. **Validation**: Add input validation middleware
4. **Rate Limiting**: Implement rate limiting for API endpoints
5. **Logging**: Add structured logging
6. **Monitoring**: Add health checks and metrics
7. **Environment Variables**: Use environment variables for configuration

## License

MIT 