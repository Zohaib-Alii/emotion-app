import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "testtt",
  userID: "123",
  test: false,
  allFeeds: [],
};

const currentUserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    settingUserID: (state, action) => {
      state.userID = action.payload;
    },
    handleFeeds: (state, action) => {
      state.allFeeds = action.payload;
    },
  },
});
export const { settingUserID, handleFeeds } = currentUserSlice.actions;

export default currentUserSlice.reducer;
