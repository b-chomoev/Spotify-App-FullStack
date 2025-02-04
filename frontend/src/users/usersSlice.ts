import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, User, ValidationError } from '../types';
import { login, register } from './usersThunks.ts';
import { RootState } from '../app/store.ts';

interface UsersState {
  user: User | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
}

export const selectUser = (state: RootState) => state.users.user;
export const selectRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectRegisterError = (state: RootState) => state.users.registerError;

export const selectLoginError = (state: RootState) => state.users.loginError;
export const selectLoginLoading = (state: RootState) => state.users.loginLoading;

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, {payload: registerResponse}) => {
        state.registerLoading = false;
        state.user = registerResponse.user;
      })
      .addCase(register.rejected, (state, {payload: error}) => {
        state.registerLoading = false;
        state.registerError = error || null;
      })

      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, {payload: user}) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, {payload: error}) => {
        state.loginLoading = false;
        state.loginError = error || null;
      });
  }
});

export const unsetUser = usersSlice.actions.unsetUser;
export const usersReducer = usersSlice.reducer;