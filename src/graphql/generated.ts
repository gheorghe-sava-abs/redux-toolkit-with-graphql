import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToOrder: Order;
  createOrder: Order;
  createProduct: Product;
  createUser: User;
  deleteOrder: Order;
  deleteProduct: Product;
  deleteUser: User;
  updateOrder: Order;
  updateOrderStatus: Order;
  updateProduct: Product;
  updateProductStock: Product;
  updateUser: User;
};


export type MutationAddItemToOrderArgs = {
  id: Scalars['ID']['input'];
  item: OrderItemInput;
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
};


export type MutationCreateProductArgs = {
  input: ProductInput;
};


export type MutationCreateUserArgs = {
  input: UserInput;
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID']['input'];
  input: OrderInput;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: Scalars['String']['input'];
};


export type MutationUpdateProductArgs = {
  id: Scalars['ID']['input'];
  input: ProductInput;
};


export type MutationUpdateProductStockArgs = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  shippingAddress: ShippingAddress;
  status: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
  userId: Scalars['ID']['output'];
};

export type OrderInput = {
  items: Array<OrderItemInput>;
  shippingAddress: ShippingAddressInput;
  userId: Scalars['ID']['input'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ID']['output'];
  quantity: Scalars['Int']['output'];
};

export type OrderItemInput = {
  price: Scalars['Float']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};

export type Product = {
  __typename?: 'Product';
  category: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  stock: Scalars['Int']['output'];
  updatedAt: Scalars['String']['output'];
};

export type ProductInput = {
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  stock: Scalars['Int']['input'];
};

export type Query = {
  __typename?: 'Query';
  order?: Maybe<Order>;
  orders: Array<Order>;
  ordersByStatus: Array<Order>;
  ordersByUser: Array<Order>;
  product?: Maybe<Product>;
  products: Array<Product>;
  productsByCategory: Array<Product>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersByStatusArgs = {
  status: Scalars['String']['input'];
};


export type QueryOrdersByUserArgs = {
  userId: Scalars['ID']['input'];
};


export type QueryProductArgs = {
  id: Scalars['ID']['input'];
};


export type QueryProductsByCategoryArgs = {
  category: Scalars['String']['input'];
};


export type QueryUserArgs = {
  id: Scalars['ID']['input'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
  city: Scalars['String']['output'];
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  zipCode: Scalars['String']['output'];
};

export type ShippingAddressInput = {
  city: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  zipCode: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  age?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  orders?: Maybe<Array<Order>>;
  updatedAt: Scalars['String']['output'];
};

export type UserInput = {
  age?: InputMaybe<Scalars['Int']['input']>;
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};
