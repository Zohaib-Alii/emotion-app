import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "testtt",
  userID: "123",
  test: false,
};

const currentUserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    test: (state, action) => {
      state.userID = action.payload;
    },
  },
});
export const { test } = currentUserSlice.actions;

export default currentUserSlice.reducer;
