import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  event: [],
  error: null,
};
const eventReducer = createSlice({
  name: 'eventReducer',
  initialState,
  reducers: {
    loadEventStart: (state) => {
      state.loading = true;
    },
    loadEventSuccess: (state, action) => {
      state.loading = false;
      state.event = action.payload;
      state.error = null;
    },
    loadEventFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.event = null;
    },
  },
});
export const { loadEventStart, loadEventSuccess, loadEventFail } =
  eventReducer.actions;
export default eventReducer.reducer;
