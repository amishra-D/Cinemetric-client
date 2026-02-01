import { configureStore } from "@reduxjs/toolkit";
import recommendationReducer from "./recommendationSlice";
import omdbReducer from "./omdbslice";

export const store = configureStore({
  reducer: {
    recommendation: recommendationReducer,
    omdb: omdbReducer,
  },
});
