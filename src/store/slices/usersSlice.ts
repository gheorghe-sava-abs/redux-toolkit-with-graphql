import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { apolloClient } from '../../services/apolloClient';
import {
  GET_USERS,
  GET_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from '../../services/graphqlQueries';
import type {
  User,
  UserInput,
  UsersState,
  GetUsersResponse,
  GetUserResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
} from '../../types';

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

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

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    // fetchUsers
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // fetchUser
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // createUser
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.users.push(action.payload);
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // updateUser
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.users.findIndex(user => user.id === action.payload?.id);
          if (index !== -1) {
            state.users[index] = action.payload;
          }
          if (state.selectedUser?.id === action.payload?.id) {
            state.selectedUser = action.payload;
          }
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // deleteUser
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.users = state.users.filter(user => user.id !== action.payload?.id);
          if (state.selectedUser?.id === action.payload?.id) {
            state.selectedUser = null;
          }
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedUser, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer; 