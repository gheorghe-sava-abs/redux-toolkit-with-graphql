import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product, ProductsState } from '../models';
import {
  fetchProducts,
  fetchProduct,
  fetchProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
  updateProductStock,
} from '../thunks/productsThunks';
import { interceptThunkResults } from '../extensions';

const initialState: ProductsState = {
  products: [],
  selectedProduct: null,
  actions: {},
};

const productsSlice_name = "products";
const productsSlice = createSlice({
  name: productsSlice_name,
  initialState,
  reducers: {
    setSelectedProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.products.push(action.payload);
        }
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.products.findIndex(product => product.id === action.payload?.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          if (state.selectedProduct?.id === action.payload?.id) {
            state.selectedProduct = action.payload;
          }
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (action.payload) {
          state.products = state.products.filter(product => product.id !== action.payload?.id);
          if (state.selectedProduct?.id === action.payload?.id) {
            state.selectedProduct = null;
          }
        }
      })
      .addCase(updateProductStock.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.products.findIndex(product => product.id === action.payload?.id);
          if (index !== -1) {
            state.products[index] = action.payload;
          }
          if (state.selectedProduct?.id === action.payload?.id) {
            state.selectedProduct = action.payload;
          }
        }
      })
      interceptThunkResults(builder, productsSlice_name);
  },
});

export const { setSelectedProduct, clearSelectedProduct } = productsSlice.actions;
export default productsSlice.reducer; 