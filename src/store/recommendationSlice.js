import { createSlice } from "@reduxjs/toolkit";
import { fetchRecommendations } from "./recommendationthunk";
const initialState = {
  queryMovie: null,
  recommendations: [],
  modelType: "hybrid",
  alpha: 0.6,
  model_name:"Hybrid",
  generatedAt: null,
  status: "idle",
  error: null,
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,

  reducers: {
    setRecommendations: (state, action) => {
      state.queryMovie = action.payload.queryMovie;
      state.recommendations = action.payload.recommendations;
      state.modelType = action.payload.modelType || "hybrid";
      state.model_name = action.payload.model_name || "Hybrid";
      state.alpha = action.payload.alpha ?? 0.5;
      state.generatedAt = Date.now();
      state.status = "succeeded";
      state.error = null;
    },

    clearRecommendations: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.queryMovie = action.payload.queryMovie;
        state.recommendations = action.payload.recommendations;
        state.modelType = action.payload.modelType;
        state.model_name = action.payload.model_name;
        state.alpha = action.payload.alpha;
        state.generatedAt = Date.now();
        state.status = "succeeded";
      })

      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch recommendations";
      });
  },
});

export const { setRecommendations, clearRecommendations } =
  recommendationSlice.actions;

export default recommendationSlice.reducer;
