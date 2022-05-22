import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import musicSlice from "./musicSlice";

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    music: musicSlice.reducer,
  },
});
