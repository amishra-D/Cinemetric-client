import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchmoviedetails } from "../../utils/fetchmovies";
export const fetchOmdbDetails = createAsyncThunk(
  "omdb/fetchDetails",
  async (titles, { rejectWithValue }) => {
    try {
      const results = await Promise.all(
        titles.map((title) =>
          fetchmoviedetails({ movietitle: title })
        )
      );

      return results.filter(Boolean);
    } catch {
      return rejectWithValue("Failed to fetch OMDB details");
    }
  }
);
