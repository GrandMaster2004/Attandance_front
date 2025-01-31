import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
};

const loginButtonSlice = createSlice({
  name: "loginButton",
  initialState,
  reducers: {
    toggleLoginState(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { toggleLoginState } = loginButtonSlice.actions;

export default loginButtonSlice.reducer;
