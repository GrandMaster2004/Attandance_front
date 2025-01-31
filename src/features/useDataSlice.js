import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  objects: [],
};

const useDataSlice = createSlice({
  name: "useData",
  initialState,
  reducers: {
    saveObjects: (state, action) => {
      state.objects = action.payload;
    },
  },
});

export const { saveObjects } = useDataSlice.actions;
export default useDataSlice.reducer;
