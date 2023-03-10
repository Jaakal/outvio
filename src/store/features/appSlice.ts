import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../../components/modals/AllOrders/AllOrdersTable/AllOrdersTable.types';

export type SearchFilter = {
  keys: Array<keyof Omit<Order, 'formattedTotal' | 'currency'>> | null;
  value: string | number | null;
};

export type CurrentSortKey = Omit<
  Order,
  'formattedTotal' | 'formattedDate' | 'currency'
>;

export type SortFilter = {
  currentSortKey: keyof CurrentSortKey;
  isAscending: boolean;
};

type AppState = {
  isAddNewOrderModalVisible: boolean;
  searchFilter: SearchFilter | null;
  sortFilter: SortFilter | null;
};

const initialState: AppState = {
  isAddNewOrderModalVisible: false,
  searchFilter: null,
  sortFilter: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsAddNewOrderModalVisible: (state, action: PayloadAction<boolean>) => {
      state.isAddNewOrderModalVisible = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<SearchFilter | null>) => {
      state.searchFilter = action.payload;
    },
    setSortFilter: (state, action: PayloadAction<SortFilter | null>) => {
      state.sortFilter = action.payload;
    },
  },
});

export const { setIsAddNewOrderModalVisible, setSearchFilter, setSortFilter } =
  appSlice.actions;

export default appSlice.reducer;
