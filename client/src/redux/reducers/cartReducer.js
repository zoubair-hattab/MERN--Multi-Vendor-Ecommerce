import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  cart:
    localStorage.getItem('persist:root') &&
    JSON.parse(localStorage.getItem('persist:root'))['cart']
      ? JSON.parse(JSON.parse(localStorage.getItem('persist:root'))['cart'])[
          'cart'
        ]
      : [],
};
const cartReducer = createSlice({
  name: 'cartReducer',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        return {
          ...state,
          cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
        };
      } else {
        return {
          ...state,
          cart: [...state.cart, item],
        };
      }
    },
    removeFromCart: (state, action) => {
      return {
        ...state,
        cart: state.cart.filter((i) => i._id !== action.payload._id),
      };
    },
  },
});
export const { addToCart, removeFromCart } = cartReducer.actions;
export default cartReducer.reducer;
