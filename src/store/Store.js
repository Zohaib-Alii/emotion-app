import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "../redux/UserSlice";
export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice,
  },
});
