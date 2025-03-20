import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define a counter slice with a reducer
const counterSlice = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: state => state + 1,
    decrement: state => state - 1,
  },
});

// Extract the action creators and reducer
const { actions, reducer: counterReducer } = counterSlice;

// Configure the store with the counter reducer
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export the counter actions
export const { increment, decrement } = actions;

export default store;
