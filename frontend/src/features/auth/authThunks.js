import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosInstance";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Register user
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post("/user/register", formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

//Login user
// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async ({ identifier, password }, thunkAPI) => {
//     try {
//       console.log("Trying to log in with:", { identifier, password }); // ✅ log

//       const response = await axios.post(
//         `/auth/login`,
//         { identifier, password },
//         {
//           withCredentials: true, // ✅ REQUIRED to send/receive cookies
//         }
//       );

//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Login failed"
//       );
//     }
//   }
// );


export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ identifier, password }, thunkAPI) => {
    try {
    //  console.log("Trying to log in with:", { identifier, password });

      const response = await axios.post(
        `/auth/login`,
        { identifier, password },
        {
          withCredentials: true, // ✅ Send cookies
        }
      );
      console.log("🧪 Login API response:", response.data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        message: error?.response?.data?.message || "Login failed",
      });
    }
  }
);




const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("token");
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;