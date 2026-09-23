import {
  createAsyncThunk,
  createSlice
} from '@reduxjs/toolkit';

import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi
} from '@api';

import type { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  profileOrders: TOrder[];
  currentOrder: TOrder | null;

  total: number;
  totalToday: number;

  isLoading: boolean;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  profileOrders: [],
  currentOrder: null,

  total: 0,
  totalToday: 0,

  isLoading: false,
  error: null
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => {
    return getFeedsApi();
  }
);

export const getProfileOrders = createAsyncThunk(
  'feed/getProfileOrders',
  async () => {
    return getOrdersApi();
  }
);

export const getOrderByNumber = createAsyncThunk(
  'feed/getOrderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    const order = response.orders[0];

    if (!order) {
      throw new Error('Заказ не найден');
    }

    return order;
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,

  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    }
  },

  extraReducers: (builder) => {
    builder
      // Общая лента
      .addCase(getFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.isLoading = false;

        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.isLoading = false;

        state.error =
          action.error.message ??
          'Не удалось загрузить ленту заказов';
      })

      // История заказов пользователя
      .addCase(getProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getProfileOrders.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.profileOrders = action.payload;
        }
      )
      .addCase(
        getProfileOrders.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.error.message ??
            'Не удалось загрузить историю заказов';
        }
      )

      // Один конкретный заказ
      .addCase(getOrderByNumber.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.currentOrder = null;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (state, action) => {
          state.isLoading = false;
          state.currentOrder = action.payload;
        }
      )
      .addCase(
        getOrderByNumber.rejected,
        (state, action) => {
          state.isLoading = false;

          state.error =
            action.error.message ??
            'Не удалось загрузить заказ';
        }
      );
  }
});

export const { clearCurrentOrder } = feedSlice.actions;

export const feedReducer = feedSlice.reducer;