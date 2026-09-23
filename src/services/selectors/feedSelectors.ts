import type { RootState } from '../store';

export const selectFeedOrders = (state: RootState) =>
  state.feed.orders;

export const selectFeedTotal = (state: RootState) =>
  state.feed.total;

export const selectFeedTotalToday = (state: RootState) =>
  state.feed.totalToday;

export const selectFeedLoading = (state: RootState) =>
  state.feed.isLoading;

export const selectFeedError = (state: RootState) =>
  state.feed.error;

export const selectProfileOrders = (state: RootState) =>
  state.feed.profileOrders;

export const selectCurrentOrder = (state: RootState) =>
  state.feed.currentOrder;