import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  currentSeller: null,
  error: null,
};
const sellerReducer = createSlice({
  name: 'sellerReducer',
  initialState,
  reducers: {
    signInShopStart: (state) => {
      state.loading = true;
    },
    signInShopSuccess: (state, action) => {
      state.loading = false;
      state.currentSeller = action.payload;
      state.error = null;
    },
    signInShopFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentSeller == null;
    },
    loadShopStart: (state) => {
      state.loading = true;
    },
    loadShopSuccess: (state, action) => {
      state.loading = false;
      state.currentSeller = action.payload;
      state.error = null;
    },
    loadShopFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentSeller = null;
    },
  },
});
export const {
  signInShopStart,
  signInShopSuccess,
  signInShopFail,
  loadShopStart,
  loadShopSuccess,
  loadShopFail,
} = sellerReducer.actions;
export default sellerReducer.reducer;
