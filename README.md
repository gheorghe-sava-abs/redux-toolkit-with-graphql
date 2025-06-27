# Redux Toolkit with GraphQL

A modern React application demonstrating the integration of Redux Toolkit with GraphQL, featuring a complete CRUD system with three models (Users, Products, Orders) and a full-stack architecture.

## 🚀 Features

- **Full-Stack Architecture**: React frontend with Node.js GraphQL backend
- **Redux Toolkit Integration**: Modern state management with async thunks
- **GraphQL API**: Type-safe queries and mutations with Apollo Client
- **Three Complete Models**: Users, Products, and Orders with full CRUD operations
- **TypeScript Support**: End-to-end type safety
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Real-time Data**: Automatic cache invalidation and data synchronization

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd redux-toolkit-with-graphql
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

## 🚀 Getting Started

### 1. Start the GraphQL Server

```bash
cd server
npm run dev
```

The GraphQL server will start at `http://localhost:4000`
- GraphQL Playground: `http://localhost:4000/graphql`
- Health Check: `http://localhost:4000/health`

### 2. Start the React Application

```bash
npm run dev
```

The React app will start at `http://localhost:3000`

## 📁 Project Structure

```
redux-toolkit-with-graphql/
├── server/                          # GraphQL Backend
│   ├── src/
│   │   ├── models/                  # Data models with CRUD operations
│   │   │   ├── User.js
│   │   │   ├── Product.js
│   │   │   └── Order.js
│   │   ├── resolvers/               # GraphQL resolvers
│   │   │   └── index.js
│   │   ├── schemas/                 # GraphQL schema definitions
│   │   │   └── typeDefs.js
│   │   └── index.js                 # Server entry point
│   ├── package.json
│   └── README.md
├── src/                             # React Frontend
│   ├── components/                  # React components
│   │   ├── GraphQLDemo.tsx          # Main demo component
│   │   └── layout/
│   │       └── VersionInfo.tsx
│   ├── services/                    # API and client services
│   │   ├── apolloClient.ts          # Apollo Client configuration
│   │   └── graphqlQueries.ts        # GraphQL queries and mutations
│   ├── store/                       # Redux Toolkit store
│   │   ├── thunks/                  # Async thunks for API operations
│   │   │   ├── usersThunks.ts
│   │   │   ├── productsThunks.ts
│   │   │   └── ordersThunks.ts
│   │   ├── slices/                  # Redux slices for state management
│   │   │   ├── usersSlice.ts
│   │   │   ├── productsSlice.ts
│   │   │   └── ordersSlice.ts
│   │   ├── hooks.ts                 # Typed Redux hooks
│   │   └── index.ts                 # Store configuration
│   ├── types/                       # TypeScript type definitions
│   │   └── index.ts
│   └── main.tsx                     # Application entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎯 Available Operations

### Users
- `fetchUsers()` - Get all users
- `fetchUser(id)` - Get single user with orders
- `createUser(input)` - Create new user
- `updateUser(id, input)` - Update user
- `deleteUser(id)` - Delete user

### Products
- `fetchProducts()` - Get all products
- `fetchProduct(id)` - Get single product
- `fetchProductsByCategory(category)` - Filter by category
- `createProduct(input)` - Create new product
- `updateProduct(id, input)` - Update product
- `deleteProduct(id)` - Delete product
- `updateProductStock(id, quantity)` - Update stock levels

### Orders
- `fetchOrders()` - Get all orders
- `fetchOrder(id)` - Get single order with details
- `fetchOrdersByUser(userId)` - Filter by user
- `fetchOrdersByStatus(status)` - Filter by status
- `createOrder(input)` - Create new order
- `updateOrder(id, input)` - Update order
- `deleteOrder(id)` - Delete order
- `updateOrderStatus(id, status)` - Update order status
- `addItemToOrder(id, item)` - Add item to order

## 💻 Usage Examples

### Using Redux Hooks

```typescript
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchUsers, createUser } from '../store/thunks/usersThunks';

const MyComponent = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCreateUser = (userData) => {
    dispatch(createUser(userData));
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### GraphQL Queries

```typescript
// Get all users with their orders
const GET_USERS_WITH_ORDERS = gql`
  query GetUsersWithOrders {
    users {
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
        }
      }
    }
  }
`;

// Create a new product
const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      id
      name
      description
      price
      category
      stock
    }
  }
`;
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_VERSION=1.0.0
VITE_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### GraphQL Server Configuration

The server runs on port 4000 by default. You can change this by setting the `PORT` environment variable:

```bash
PORT=5000 npm run dev
```

## 🧪 Testing

### Run Frontend Tests
```bash
npm test
```

### Test GraphQL Server
```bash
cd server
npm test
```

## 📦 Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm test` - Run tests

### Backend Scripts
- `npm run dev` - Start development server with auto-restart
- `npm start` - Start production server
- `npm test` - Run tests

## 🏗️ Architecture

### Frontend Architecture
- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Apollo Client** for GraphQL integration
- **Vite** for fast development and building
- **Tailwind CSS** for styling

### Backend Architecture
- **Node.js** with Express
- **Apollo Server v4** for GraphQL
- **In-memory storage** (easily replaceable with database)
- **CORS enabled** for cross-origin requests

### Data Flow
1. **Component** dispatches async thunk
2. **Thunk** makes GraphQL request via Apollo Client
3. **GraphQL Server** processes request and returns data
4. **Redux Slice** updates state with response
5. **Component** re-renders with new data

## 🔄 State Management

The application uses Redux Toolkit with a modular approach:

- **Thunks**: Handle async operations and API calls
- **Slices**: Manage state and handle actions
- **Hooks**: Provide typed access to store
- **Types**: Ensure type safety throughout

## 🎨 UI Components

The demo includes:
- **User Management**: Create, view, update, delete users
- **Product Catalog**: Manage products with categories and stock
- **Order System**: Handle orders with status management
- **Real-time Updates**: Automatic data synchronization
- **Error Handling**: Comprehensive error states
- **Loading States**: User feedback during operations

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm start
# Deploy to your Node.js hosting service
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Redux Toolkit](https://redux-toolkit.js.org/) for modern Redux development
- [Apollo GraphQL](https://www.apollographql.com/) for GraphQL client and server
- [React](https://reactjs.org/) for the UI library
- [TypeScript](https://www.typescriptlang.org/) for type safety
- [Tailwind CSS](https://tailwindcss.com/) for styling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy coding! 🎉**