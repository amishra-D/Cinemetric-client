import { createSlice } from "@reduxjs/toolkit";
import { fetchOmdbDetails } from "./omdbthunk";
const omdbSlice = createSlice({
  name: "omdb",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {
    clearOmdb: (state) => {
      state.movies = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOmdbDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOmdbDetails.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchOmdbDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearOmdb } = omdbSlice.actions;
export default omdbSlice.reducer;
