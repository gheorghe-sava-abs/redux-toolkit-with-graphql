import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UsersState } from '../models';
import {
  fetchUsers,
  fetchUser,
  createUser,
  updateUser,
  deleteUser,
} from '../thunks/usersThunks';
import { interceptThunkResults } from '../extensions';

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  actions: {},
};

const usersSlice_name = "users";
const usersSlice = createSlice({
  name: usersSlice_name,
  initialState,
  reducers: {
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.users.push(action.payload);
        }
      })
      .addCase(updateUser.fulfilled, (state, action) => {
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
      .addCase(deleteUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.users = state.users.filter(user => user.id !== action.payload?.id);
          if (state.selectedUser?.id === action.payload?.id) {
            state.selectedUser = null;
          }
        }
      })

      interceptThunkResults(builder, usersSlice_name);
  },
});

export const { setSelectedUser, clearSelectedUser } = usersSlice.actions;
export default usersSlice.reducer; 