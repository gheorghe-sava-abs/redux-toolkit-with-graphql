import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Order, OrdersState } from '../models';
import {
  fetchOrders,
  fetchOrder,
  fetchOrdersByUser,
  fetchOrdersByStatus,
  createOrder,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
  addItemToOrder,
} from '../thunks/ordersThunks';
import { interceptThunkResults } from '../extensions';

const initialState: OrdersState = {
  orders: [],
  selectedOrder: null,
  actions: {},
};

const ordersSlice_name = "orders";
const ordersSlice = createSlice({
  name: ordersSlice_name,
  initialState,
  reducers: {
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload;
    },
    clearSelectedOrder: (state) => {
      state.selectedOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByStatus.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders.push(action.payload);
        }
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
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
      .addCase(deleteOrder.fulfilled, (state, action) => {
        if (action.payload) {
          state.orders = state.orders.filter(order => order.id !== action.payload?.id);
          if (state.selectedOrder?.id === action.payload?.id) {
            state.selectedOrder = null;
          }
        }
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
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
      .addCase(addItemToOrder.fulfilled, (state, action) => {
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
      interceptThunkResults(builder, ordersSlice_name);
  },
});

export const { setSelectedOrder, clearSelectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer; 