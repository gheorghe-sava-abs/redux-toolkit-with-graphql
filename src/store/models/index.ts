import type { BaseState } from "../extensions";

// Base types
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
  }
  
  // User types
  export interface User extends BaseEntity {
    name: string;
    email: string;
    age?: number;
  }
  
  export interface UserInput {
    name: string;
    email: string;
    age?: number;
  }
  
  // Product types
  export interface Product extends BaseEntity {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }
  
  export interface ProductInput {
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
  }
  
  // Order types
  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
    product?: Product;
  }
  
  export interface OrderItemInput {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export interface ShippingAddress {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface ShippingAddressInput {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  }
  
  export interface Order extends BaseEntity {
    userId: string;
    user?: User;
    items: OrderItem[];
    total: number;
    status: string;
    shippingAddress: ShippingAddress;
  }
  
  export interface OrderInput {
    userId: string;
    items: OrderItemInput[];
    shippingAddress: ShippingAddressInput;
  }
  
  // API Response types
  export interface ApiResponse<T> {
    data?: T;
    error?: string;
    loading: boolean;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
  }
  
  // GraphQL Query Response types
  export interface GetUsersResponse {
    users: User[];
  }
  
  export interface GetUserResponse {
    user: User;
  }
  
  export interface GetProductsResponse {
    products: Product[];
  }
  
  export interface GetProductResponse {
    product: Product;
  }
  
  export interface GetProductsByCategoryResponse {
    productsByCategory: Product[];
  }
  
  export interface GetOrdersResponse {
    orders: Order[];
  }
  
  export interface GetOrderResponse {
    order: Order;
  }
  
  export interface GetOrdersByUserResponse {
    ordersByUser: Order[];
  }
  
  export interface GetOrdersByStatusResponse {
    ordersByStatus: Order[];
  }
  
  // GraphQL Mutation Response types
  export interface CreateUserResponse {
    createUser: User;
  }
  
  export interface UpdateUserResponse {
    updateUser: User;
  }
  
  export interface DeleteUserResponse {
    deleteUser: User;
  }
  
  export interface CreateProductResponse {
    createProduct: Product;
  }
  
  export interface UpdateProductResponse {
    updateProduct: Product;
  }
  
  export interface DeleteProductResponse {
    deleteProduct: Product;
  }
  
  export interface UpdateProductStockResponse {
    updateProductStock: Product;
  }
  
  export interface CreateOrderResponse {
    createOrder: Order;
  }
  
  export interface UpdateOrderResponse {
    updateOrder: Order;
  }
  
  export interface DeleteOrderResponse {
    deleteOrder: Order;
  }
  
  export interface UpdateOrderStatusResponse {
    updateOrderStatus: Order;
  }
  
  export interface AddItemToOrderResponse {
    addItemToOrder: Order;
  }
  
  // Store state types
  export interface UsersState extends BaseState {
    users: User[];
    selectedUser: User | null;
  }
  
  export interface ProductsState extends BaseState{
    products: Product[];
    selectedProduct: Product | null;
  }
  
  export interface OrdersState extends BaseState {
    orders: Order[];
    selectedOrder: Order | null;
  }
  
  export interface RootState {
    users: UsersState;
    products: ProductsState;
    orders: OrdersState;
  } 