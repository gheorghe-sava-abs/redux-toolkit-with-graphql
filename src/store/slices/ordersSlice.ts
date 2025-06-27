import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
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
  Order,
  OrderInput,
  OrderItemInput,
  OrdersState,
  GetOrdersResponse,
  GetOrderResponse,
  GetOrdersByUserResponse,
  GetOrdersByStatusResponse,
  CreateOrderResponse,
  UpdateOrderResponse,
  DeleteOrderResponse,
  UpdateOrderStatusResponse,
  AddItemToOrderResponse,
} from '../../types';

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  loading: false,
  error: null,
};

// Async thunks for GraphQL operations
export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
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

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
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

export const fetchOrdersByUser = createAsyncThunk(
  'orders/fetchOrdersByUser',
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

export const fetchOrdersByStatus = createAsyncThunk(
  'orders/fetchOrdersByStatus',
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

export const createOrder = createAsyncThunk(
  'orders/createOrder',
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

export const updateOrder = createAsyncThunk(
  'orders/updateOrder',
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

export const deleteOrder = createAsyncThunk(
  'orders/deleteOrder',
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

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
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

export const addItemToOrder = createAsyncThunk(
  'orders/addItemToOrder',
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

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    // fetchOrders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchOrder
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchOrdersByUser
    builder
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchOrdersByStatus
    builder
      .addCase(fetchOrdersByStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // createOrder
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.orders.push(action.payload);
        }
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updateOrder
    builder
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.orders.findIndex(order => order.id === action.payload?.id);
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          if (state.selectedOrder?.id === action.payload?.id) {
            state.selectedOrder = action.payload;
          }
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // deleteOrder
    builder
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.orders = state.orders.filter(order => order.id !== action.payload?.id);
          if (state.selectedOrder?.id === action.payload?.id) {
            state.selectedOrder = null;
          }
        }
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updateOrderStatus
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.orders.findIndex(order => order.id === action.payload?.id);
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          if (state.selectedOrder?.id === action.payload?.id) {
            state.selectedOrder = action.payload;
          }
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // addItemToOrder
    builder
      .addCase(addItemToOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToOrder.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.orders.findIndex(order => order.id === action.payload?.id);
          if (index !== -1) {
            state.orders[index] = action.payload;
          }
          if (state.selectedOrder?.id === action.payload?.id) {
            state.selectedOrder = action.payload;
          }
        }
      })
      .addCase(addItemToOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedOrder, clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer; 