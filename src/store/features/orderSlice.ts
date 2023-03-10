import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type Order } from '../../components/modals/AllOrders/AllOrdersTable/AllOrdersTable.types';

type OrderState = {
  value: Array<Order>;
};

const initialState: OrderState = {
  value: [],
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Order>) => {
      state.value = [action.payload, ...state.value];
    },
    addOrders: (state, action: PayloadAction<Array<Order>>) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

export const { addOrder, addOrders } = orderSlice.actions;

export default orderSlice.reducer;
