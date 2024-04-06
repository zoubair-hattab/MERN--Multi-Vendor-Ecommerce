import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  product: [],
  error: null,
};
const productReducer = createSlice({
  name: 'productReducer',
  initialState,
  reducers: {
    loadProductStart: (state) => {
      state.loading = true;
    },
    loadProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = null;
    },
    loadProductFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.product = null;
    },
  },
});
export const { loadProductStart, loadProductSuccess, loadProductFail } =
  productReducer.actions;
export default productReducer.reducer;
