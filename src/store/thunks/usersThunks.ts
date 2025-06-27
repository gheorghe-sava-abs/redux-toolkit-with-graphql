import { createAsyncThunk } from '@reduxjs/toolkit';
import { apolloClient } from '../../services/apolloClient';
import {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../../services/graphqlQueries';
import type {
  UserInput,
  GetUsersResponse,
  GetUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from '../models';

// Async thunks for GraphQL operations
export const fetchUsers_name = 'users/fetchUsers';
export const fetchUsers = createAsyncThunk(
  fetchUsers_name,
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetUsersResponse>({
        query: GET_USERS,
      });
      return data.users;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch users');
    }
  }
);

export const fetchUser_name = 'users/fetchUser';
export const fetchUser = createAsyncThunk(
  fetchUser_name,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.query<GetUserResponse>({
        query: GET_USER,
        variables: { id },
      });
      return data.user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user');
    }
  }
);

export const createUser_name = 'users/createUser';
export const createUser = createAsyncThunk(
  createUser_name,
  async (userInput: UserInput, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<CreateUserResponse>({
        mutation: CREATE_USER,
        variables: { input: userInput },
        refetchQueries: [{ query: GET_USERS }],
      });
      return data?.createUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to create user');
    }
  }
);

export const updateUser_name = 'users/updateUser';
export const updateUser = createAsyncThunk(
  updateUser_name,
  async ({ id, input }: { id: string; input: UserInput }, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<UpdateUserResponse>({
        mutation: UPDATE_USER,
        variables: { id, input },
        refetchQueries: [{ query: GET_USERS }, { query: GET_USER, variables: { id } }],
      });
      return data?.updateUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to update user');
    }
  }
);

export const deleteUser_name = 'users/deleteUser';
export const deleteUser = createAsyncThunk(
  deleteUser_name,
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await apolloClient.mutate<DeleteUserResponse>({
        mutation: DELETE_USER,
        variables: { id },
        refetchQueries: [{ query: GET_USERS }],
      });
      return data?.deleteUser;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to delete user');
    }
  }
); 