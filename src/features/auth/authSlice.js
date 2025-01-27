import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Register Company
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/companies/register', userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Login Company
export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/companies/login`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Send Email OTP
export const sendEmailOTP = createAsyncThunk(
  'auth/sendEmailOTP',
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/companies/verify-email`, { email });
      
      // Store OTP in localStorage
      localStorage.setItem('emailOtp', response.data.otp);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


// ✅ Verify Email OTP
export const verifyEmailOTP = createAsyncThunk(
  'auth/verifyEmailOTP',
  async (userOtp, { rejectWithValue }) => {
    try {
      const storedOtp = localStorage.getItem('emailOtp');

      if (storedOtp === userOtp) {
        localStorage.removeItem('emailOtp'); // Remove OTP after verification
        return { msg: "OTP Verified Successfully" };
      } else {
        return rejectWithValue({ msg: "Invalid OTP" });
      }
    } catch (err) {
      return rejectWithValue({ msg: "Error verifying OTP" });
    }
  }
);




// ✅ Send Mobile OTP
export const sendMobileOTP = createAsyncThunk(
  'auth/sendMobileOTP',
  async (mobile, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/companies/verify-mobile`, { mobile });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

// ✅ Verify Mobile OTP
export const verifyMobileOTP = createAsyncThunk(
  'auth/verifyMobileOTP',
  async ({ mobile, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/companies/verify-mobile-otp`, { mobile, otp });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    emailVerified: false,
    mobileVerified: false
  },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendEmailOTP.fulfilled, () => {
        console.log("Email OTP sent!");
      })
      .addCase(verifyEmailOTP.fulfilled, (state) => {
        state.emailVerified = true;
      })
      .addCase(sendMobileOTP.fulfilled, () => {
        console.log("Mobile OTP sent!");
      })
      .addCase(verifyMobileOTP.fulfilled, (state) => {
        state.mobileVerified = true;
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
