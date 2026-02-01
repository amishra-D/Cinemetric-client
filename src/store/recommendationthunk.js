import { createAsyncThunk } from "@reduxjs/toolkit";
import { recommendmovies } from "../../utils/fetchmovies";
export const fetchRecommendations = createAsyncThunk(
  "recommendation/fetch",
  async ({ movietitle, top_n, alpha,model_name }, { rejectWithValue }) => {
    try {
      console.log("api hit in thunk");
      const data = await recommendmovies({
        movietitle,
        top_n,
        alpha,
        model_name
      });

      return {
        queryMovie: movietitle,
        recommendations: data.recommendations,
        modelType: model_name,
        alpha,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch recommendations");
    }
  }
);
