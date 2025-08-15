

import { configureStore } from '@reduxjs/toolkit';
import libraryReducer from './slices/librarySlice';
import searchReducer from './slices/searchSlice';

const store = configureStore({
  reducer: {
    library: libraryReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST']
      }
    })
});

export default store;

