import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";
//import jwt_decode from "jwt-decode";
import { jwtDecode } from "jwt-decode";



// Async thunk to login user
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    
    try {
        const response = await axios.post(
            "/auth/login",
            credentials,
            { withCredentials: true } // ✅ this is required for cookies
          );
      return response.data; // expected: { user, token }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

// Initial state
const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    loadUserFromStorage: (state) => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
            const decoded = jwtDecode(token);
          state.token = token;
          state.user = decoded.user || decoded; // based on your token payload
        } catch (err) {
          console.error("Invalid token",err);
          localStorage.removeItem("token");
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});


// Export actions
export const { logout, loadUserFromStorage } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
