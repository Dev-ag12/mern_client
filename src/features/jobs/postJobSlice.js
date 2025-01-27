import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define API endpoint
// const API_URL = "http://localhost:3000/api/jobs"; // Change this to match your backend URL

export const postJob = createAsyncThunk(
    "jobs/postJob",
    async (jobData, { rejectWithValue, getState }) => {
      try {
        // Retrieve token from Redux state or localStorage
        const token = getState().auth.token || localStorage.getItem("token");
  
        // Set Authorization header
        const response = await axios.post('/api/jobs', jobData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // 🔥 Add Bearer token here
          },
        });
  
        return response.data; // Return response data to update Redux store
      } catch (error) {
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
  
  // Job slice
  const postJobSlice = createSlice({
    name: "postJob",
    initialState: {
      loading: false,
      success: false,
      error: null,
    },
    reducers: {
      resetPostJob: (state) => {
        state.success = false;
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(postJob.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(postJob.fulfilled, (state) => {
          state.loading = false;
          state.success = true;
        })
        .addCase(postJob.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { resetPostJob } = postJobSlice.actions;
  export default postJobSlice.reducer;