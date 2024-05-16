import { configureStore } from '@reduxjs/toolkit';
import { cryptoNewsApi } from '../services/cryptoNewsApi';
import { cryptoApi } from '../services/cryptoApi';
// Import other reducers if you have any

const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    // Add other reducers here
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoNewsApi.middleware).concat(cryptoApi.middleware),
});

export default store;
