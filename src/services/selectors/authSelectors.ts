import type { RootState } from '../store';

export const selectUser = (state: RootState) =>
  state.auth.user;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.user !== null;

export const selectIsAuthChecked = (state: RootState) =>
  state.auth.isAuthChecked;

export const selectAuthLoading = (state: RootState) =>
  state.auth.isLoading;

export const selectAuthError = (state: RootState) =>
  state.auth.error;