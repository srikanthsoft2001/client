import { combineReducers } from '@reduxjs/toolkit';
import wishlistReducer from '@/slices/wishlistSlice';

const rootReducer = combineReducers({
  wishlist: wishlistReducer,
});

export default rootReducer;
