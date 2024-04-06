import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  currentUser: null,
  error: null,
};
const userReducer = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    signInUserStart: (state) => {
      state.loading = true;
    },
    signInUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    signInUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser == null;
    },
    loadUserStart: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.currentUser = null;
    },
  },
});
export const {
  loadUserStart,
  loadUserSuccess,
  loadUserFail,
  signInUserStart,
  signInUserSuccess,
  signInUserFail,
} = userReducer.actions;
export default userReducer.reducer;
