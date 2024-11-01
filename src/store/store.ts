import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '../features/slice/commonslice';

export const store = configureStore({
  reducer: {
    common: commonReducer,
  },
});

// RootState型をエクスポートして、後で使用できるようにします。
export type RootState = ReturnType<typeof store.getState>;

// AppDispatch型をエクスポートして、後で使用できるようにします。
export type AppDispatch = typeof store.dispatch;
