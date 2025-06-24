import { ProductItem } from '@/api/api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface WishlistState {
  items: ProductItem[];
}

const initialState: WishlistState = {
  items: typeof window !== 'undefined' 
    ? JSON.parse(localStorage.getItem('wishlist') || '[]') 
    : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.items));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.items));
    },
    setWishlist: (state, action: PayloadAction<ProductItem[]>) => {
      state.items = action.payload;
      localStorage.setItem('wishlist', JSON.stringify(action.payload));
    },
    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem('wishlist');
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  setWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
