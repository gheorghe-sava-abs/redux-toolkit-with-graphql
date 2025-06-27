import { createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../services/apolloClient';
import {
  GET_PRODUCTS,
  GET_PRODUCT,
  GET_PRODUCTS_BY_CATEGORY,
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT_STOCK,
} from '../../services/graphqlQueries';
import type {
  ProductInput,
  GetProductsResponse,
  GetProductResponse,
  GetProductsByCategoryResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
  UpdateProductStockResponse,
} from '../../types';

// Async thunks for GraphQL operations
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetProductsResponse>({
        query: GET_PRODUCTS,
      });
      return data.products;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products');
    }
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fetchProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetProductResponse>({
        query: GET_PRODUCT,
        variables: { id },
      });
      return data.product;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch product');
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetProductsByCategoryResponse>({
        query: GET_PRODUCTS_BY_CATEGORY,
        variables: { category },
      });
      return data.productsByCategory;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch products by category');
    }
  }
);

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (productInput: ProductInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<CreateProductResponse>({
        mutation: CREATE_PRODUCT,
        variables: { input: productInput },
        refetchQueries: [{ query: GET_PRODUCTS }],
      });
      return data?.createProduct;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create product');
    }
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, input }: { id: string; input: ProductInput }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<UpdateProductResponse>({
        mutation: UPDATE_PRODUCT,
        variables: { id, input },
        refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT, variables: { id } }],
      });
      return data?.updateProduct;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update product');
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<DeleteProductResponse>({
        mutation: DELETE_PRODUCT,
        variables: { id },
        refetchQueries: [{ query: GET_PRODUCTS }],
      });
      return data?.deleteProduct;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete product');
    }
  }
);

export const updateProductStock = createAsyncThunk(
  'products/updateProductStock',
  async ({ id, quantity }: { id: string; quantity: number }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<UpdateProductStockResponse>({
        mutation: UPDATE_PRODUCT_STOCK,
        variables: { id, quantity },
        refetchQueries: [{ query: GET_PRODUCTS }, { query: GET_PRODUCT, variables: { id } }],
      });
      return data?.updateProductStock;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update product stock');
    }
  }
); 