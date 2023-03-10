import { configureStore } from '@reduxjs/toolkit';
import orderReducer from './features/orderSlice';
import appReducer from './features/appSlice';

const store = configureStore({
  reducer: {
    orders: orderReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
