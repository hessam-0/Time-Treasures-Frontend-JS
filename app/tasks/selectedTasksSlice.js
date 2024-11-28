import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
};

const selectedTasksSlice = createSlice({
  name: "selectedTasks",
  initialState,
  reducers: {
    setSelectedTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addSelectedTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    removeSelectedTask: (state, action) => {
      state.tasks = state.tasks.filter(
        (task) => task.task_id !== action.payload
      );
    },
    clearSelectedTasks: (state) => {
      state.tasks = [];
    },
    markTaskCompleted: (state, action) => {
      const task = state.tasks.find((task) => task.task_id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    resetTaskCompletionStatus: (state) => {
      state.tasks.forEach((task) => {
        task.completed = false;
      });
    },
  },
});

export const {
  setSelectedTasks,
  addSelectedTask,
  removeSelectedTask,
  clearSelectedTasks,
  markTaskCompleted,
  resetTaskCompletionStatus,
} = selectedTasksSlice.actions;

export default selectedTasksSlice.reducer;
