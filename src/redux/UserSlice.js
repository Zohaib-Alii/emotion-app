import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "New User",
  userID: "123",
  test: false,
  allFeeds: [],
};

const currentUserSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    settingUserID: (state, action) => {
      state.userID = action.payload?.uid;
      state.userName = action.payload?.displayName;
    },
    handleFeeds: (state, action) => {
      state.allFeeds = action.payload;
    },
    handleStateCheck: (state, action) => {
      state.currentUser = action.payload;
    },
    handleDoubleCheck: (state, action) => {
      state.userID = action.payload;
      state.test = action.payload;
    },
  },
});
export const {
  handleDoubleCheck,
  settingUserID,
  handleFeeds,
  handleStateCheck,
} = currentUserSlice.actions;

export default currentUserSlice.reducer;
