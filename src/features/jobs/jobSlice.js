import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL; // Adjust API URL

// Async thunk to fetch jobs
export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/api`);
    return response.data; // Return job data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch jobs");
  }
});

const jobSlice = createSlice({
  name: "jobList",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default jobSlice.reducer;
