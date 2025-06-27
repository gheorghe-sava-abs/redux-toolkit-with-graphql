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
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
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

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
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

export const createUser = createAsyncThunk(
  'users/createUser',
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

export const updateUser = createAsyncThunk(
  'users/updateUser',
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

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
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