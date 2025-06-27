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
} from '../models';

// Async thunks for GraphQL operations
export const fetchProducts_name = 'products/fetchProducts';
export const fetchProducts = createAsyncThunk(
  fetchProducts_name,
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

export const fetchProduct_name = 'products/fetchProduct';
export const fetchProduct = createAsyncThunk(
  fetchProduct_name,
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

export const fetchProductsByCategory_name = 'products/fetchProductsByCategory';
export const fetchProductsByCategory = createAsyncThunk(
  fetchProductsByCategory_name,
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

export const createProduct_name = 'products/createProduct';
export const createProduct = createAsyncThunk(
  createProduct_name,
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

export const updateProduct_name = 'products/updateProduct';
export const updateProduct = createAsyncThunk(
  updateProduct_name,
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

export const deleteProduct_name = 'products/deleteProduct';
export const deleteProduct = createAsyncThunk(
  deleteProduct_name,
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

export const updateProductStock_name = 'products/updateProductStock';
export const updateProductStock = createAsyncThunk(
  updateProductStock_name,
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