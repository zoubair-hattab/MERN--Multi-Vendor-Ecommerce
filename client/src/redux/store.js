import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducers/userReducer';
import sellerReducer from './reducers/sellerReducer';
import productReducer from './reducers/productReducer';
import eventReducer from './reducers/eventReducer';
import cartReducer from './reducers/cartReducer';
import wishlistReducer from './reducers/wishlistReducer';

const rootReducer = combineReducers({
  user: userReducer,
  seller: sellerReducer,
  product: productReducer,
  event: eventReducer,
  cart: cartReducer,
  wishlist: wishlistReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
