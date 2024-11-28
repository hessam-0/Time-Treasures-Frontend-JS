import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 1,
  username: "CrochetQueen",
  email: "crochetIsCool@example.com",
  level: 4,
  total_gems: 120,
  image_url: "https://avatar.iran.liara.run/public/boy?username=Ash",
  isAuthenticated: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    },
    clearUser: (state) => {
      state.userId = null;
      state.username = null;
      state.email = null;
      state.level = null;
      state.total_gems = null;
      state.image_url = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
