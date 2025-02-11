import { createSlice } from '@reduxjs/toolkit';
import {
  getSummary,
  getTransactionsByOperation,
  addTransaction,
  deleteTransaction,
} from './operations';

const initialState = {
  transactions: [],
  summary: [],
  error: null,
  isLoading: false,
  operationType: 'expenses',
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setOperationType(state, action) {
      state.operationType = action.payload;
    },
  },
  extraReducers: {
    [getSummary.fulfilled]: (state, action) => {
      state.summary = action.payload;
      state.isLoading = false;
    },
    [getSummary.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [getSummary.pending](state) {
      state.isLoading = true;
    },
    [getTransactionsByOperation.fulfilled]: (state, action) => {
      state.transactions = action.payload;
      state.isLoading = false;
    },
    [getTransactionsByOperation.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [getTransactionsByOperation.pending](state) {
      state.isLoading = true;
    },
    [addTransaction.fulfilled]: (state, action) => {
      state.transactions.push(action.payload.data);
      const res = state.summary.every(
        itm => itm.month !== action.payload.data.month
      );
      if (!res) {
        state.summary.map(item => {
          if (item.month !== action.payload.data.month) {
            return item;
          }
          return (item.sum = item.sum + action.payload.data.sum);
        });
      }
      if (res) {
        state.summary.push({
          month: action.payload.data.month,
          sum: action.payload.data.sum,
        });
      }

      state.isLoading = false;
    },
    [addTransaction.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [addTransaction.pending](state) {
      state.isLoading = true;
    },
    [deleteTransaction.fulfilled]: (state, action) => {
      const index = state.transactions.findIndex(
        transaction => transaction._id === action.payload.data._id
      );
      state.transactions.splice(index, 1);

      const res = state.summary.every(
        itm => itm.month !== action.payload.data.month
      );
      if (!res) {
        state.summary.map(item => {
          if (item.month !== action.payload.data.month) {
            return item;
          }
          return (item.sum = item.sum - action.payload.data.sum);
        });
      }

      const summaryIndex = state.summary.findIndex(item => item.sum === 0);

      if (!summaryIndex) {
        state.summary.splice(summaryIndex, 1);
      }

      state.isLoading = false;
    },
    [deleteTransaction.rejected](state, action) {
      state.error = action.payload.message;
      state.isLoading = false;
    },
    [deleteTransaction.pending](state) {
      state.isLoading = true;
    },
  },
});

export const transactionReducer = transactionSlice.reducer;
export const { setOperationType } = transactionSlice.actions;
