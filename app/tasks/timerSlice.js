import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timeLeft: 0,
  isRunning: false,
  isLocked: false,
};

const timerSlice = createSlice({
  name: "timer",
  initialState,
  reducers: {
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    setIsRunning: (state, action) => {
      state.isRunning = action.payload;
      state.isLocked = action.payload; // Lock/unlock tasks based on timer state
    },
    decrementTimer: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      }
    },
    resetTimer: (state) => {
      state.timeLeft = 0;
      state.isRunning = false;
      state.isLocked = false;
    },
  },
});

export const { setTimeLeft, setIsRunning, decrementTimer, resetTimer } =
  timerSlice.actions;
export default timerSlice.reducer;
