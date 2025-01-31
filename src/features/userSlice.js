import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roll: "",
  name: "",
  branch: "",
  year: "",
  email: "",
  number: "",
};

export const userSlice = createSlice({
  name: "user_info",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.roll = action.payload.roll;
      state.name = action.payload.name;
      state.branch = action.payload.branch;
      state.year = action.payload.year;
      state.email = action.payload.email;
      state.number = action.payload.number;

      // state.is_superuser = action.payload.is_superuser;
      // state.type = action.payload.state;
    },
    unsetUserInfo: (state, action) => {
      state.roll = action.payload.email;
      state.name = action.payload.name;
      state.branch = action.payload.branch;
      state.year = action.payload.year;
      state.email = action.payload.email;
      state.number = action.payload.number;
      // state.is_superuser = action.payload.is_superuser;
      // state.type = action.payload.state;
    },
  },
});

export const { setUserInfo, unsetUserInfo } = userSlice.actions;

export default userSlice.reducer;
