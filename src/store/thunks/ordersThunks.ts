import { createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../services/apolloClient';
import {
  GET_ORDERS,
  GET_ORDER,
  GET_ORDERS_BY_USER,
  GET_ORDERS_BY_STATUS,
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER_STATUS,
  ADD_ITEM_TO_ORDER,
} from '../../services/graphqlQueries';
import type {
  OrderInput,
  OrderItemInput,
  GetOrdersResponse,
  GetOrderResponse,
  GetOrdersByUserResponse,
  GetOrdersByStatusResponse,
  CreateOrderResponse,
  UpdateOrderResponse,
  DeleteOrderResponse,
  UpdateOrderStatusResponse,
  AddItemToOrderResponse,
} from '../models';

// Async thunks for GraphQL operations
export const fetchOrders_name = 'orders/fetchOrders';
export const fetchOrders = createAsyncThunk(
  fetchOrders_name,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetOrdersResponse>({
        query: GET_ORDERS,
      });
      return data.orders;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch orders');
    }
  }
);

export const fetchOrder_name = 'orders/fetchOrder';
export const fetchOrder = createAsyncThunk(
  fetchOrder_name,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetOrderResponse>({
        query: GET_ORDER,
        variables: { id },
      });
      return data.order;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch order');
    }
  }
);

export const fetchOrdersByUser_name = 'orders/fetchOrdersByUser';
export const fetchOrdersByUser = createAsyncThunk(
  fetchOrdersByUser_name,
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetOrdersByUserResponse>({
        query: GET_ORDERS_BY_USER,
        variables: { userId },
      });
      return data.ordersByUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch orders by user');
    }
  }
);

export const fetchOrdersByStatus_name = 'orders/fetchOrdersByStatus';
export const fetchOrdersByStatus = createAsyncThunk(
  fetchOrdersByStatus_name,
  async (status: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetOrdersByStatusResponse>({
        query: GET_ORDERS_BY_STATUS,
        variables: { status },
      });
      return data.ordersByStatus;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch orders by status');
    }
  }
);

export const createOrder_name = 'orders/createOrder';
export const createOrder = createAsyncThunk(
  createOrder_name,
  async (orderInput: OrderInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<CreateOrderResponse>({
        mutation: CREATE_ORDER,
        variables: { input: orderInput },
        refetchQueries: [{ query: GET_ORDERS }],
      });
      return data?.createOrder;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create order');
    }
  }
);

export const updateOrder_name = 'orders/updateOrder';
export const updateOrder = createAsyncThunk(
  updateOrder_name,
  async ({ id, input }: { id: string; input: OrderInput }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<UpdateOrderResponse>({
        mutation: UPDATE_ORDER,
        variables: { id, input },
        refetchQueries: [{ query: GET_ORDERS }, { query: GET_ORDER, variables: { id } }],
      });
      return data?.updateOrder;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update order');
    }
  }
);

export const deleteOrder_name = 'orders/deleteOrder';
export const deleteOrder = createAsyncThunk(
  deleteOrder_name,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<DeleteOrderResponse>({
        mutation: DELETE_ORDER,
        variables: { id },
        refetchQueries: [{ query: GET_ORDERS }],
      });
      return data?.deleteOrder;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete order');
    }
  }
);

export const updateOrderStatus_name = 'orders/updateOrderStatus';
export const updateOrderStatus = createAsyncThunk(
  updateOrderStatus_name,
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<UpdateOrderStatusResponse>({
        mutation: UPDATE_ORDER_STATUS,
        variables: { id, status },
        refetchQueries: [{ query: GET_ORDERS }, { query: GET_ORDER, variables: { id } }],
      });
      return data?.updateOrderStatus;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update order status');
    }
  }
);

export const addItemToOrder_name = 'orders/addItemToOrder';
export const addItemToOrder = createAsyncThunk(
  addItemToOrder_name,
  async ({ id, item }: { id: string; item: OrderItemInput }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<AddItemToOrderResponse>({
        mutation: ADD_ITEM_TO_ORDER,
        variables: { id, item },
        refetchQueries: [{ query: GET_ORDERS }, { query: GET_ORDER, variables: { id } }],
      });
      return data?.addItemToOrder;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to add item to order');
    }
  }
); 