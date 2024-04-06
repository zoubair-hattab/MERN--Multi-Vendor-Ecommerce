import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  wishlist:
    localStorage.getItem('persist:root') &&
    JSON.parse(localStorage.getItem('persist:root'))['wishlist']
      ? JSON.parse(
          JSON.parse(localStorage.getItem('persist:root'))['wishlist']
        )['wishlist']
      : [],
};
const wishlistReducer = createSlice({
  name: 'wishlistReducer',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const item = action.payload;
      const isItemExist = state.wishlist.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          wishlist: state.wishlist.map((i) =>
            i._id === isItemExist._id ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlist: [...state.wishlist, item],
        };
      }
    },
    removeFromWishlist: (state, action) => {
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i._id !== action.payload._id),
      };
    },
  },
});
export const { addToWishlist, removeFromWishlist } = wishlistReducer.actions;
export default wishlistReducer.reducer;
