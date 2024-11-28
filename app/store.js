import { configureStore } from "@reduxjs/toolkit";
import selectedTasksReducer from "./tasks/selectedTasksSlice";
import userReducer from "./tasks/userSlice";
import timerReducer from "./tasks/timerSlice";

const store = configureStore({
  reducer: {
    selectedTasks: selectedTasksReducer,
    user: userReducer,
    timer: timerReducer,
  },
});

export default store;
