// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { deleteComment, getAllComments } from "../../services/adminCommentService";

// // Thunk to fetch all comments
// export const fetchAdminComments = createAsyncThunk(
//   "adminComments/fetch",
//   async (_, { rejectWithValue }) => {
//     try {
//       const data = await getAllComments(); // { success, comments, total, page, pages }
//       return data.comments;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Thunk to delete a comment
// export const removeAdminComment = createAsyncThunk(
//   "adminComments/delete",
//   async (id, { rejectWithValue }) => {
//     try {
//       await deleteComment(id);
//       return id;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// // Slice
// const adminCommentSlice = createSlice({
//   name: "adminComments",
//   initialState: {
//     comments: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAdminComments.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAdminComments.fulfilled, (state, action) => {
//         state.loading = false;
//         state.comments = action.payload || [];
//       })
//       .addCase(fetchAdminComments.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(removeAdminComment.fulfilled, (state, action) => {
//         state.comments = state.comments.filter((c) => c._id !== action.payload);
//       });
//   },
// });

// export default adminCommentSlice.reducer;


import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { deleteComment, getAllComments } from "../../services/adminCommentService";

// Thunk to fetch all comments with optional query params (e.g., page, limit, search)
export const fetchAdminComments = createAsyncThunk(
  "adminComments/fetch",
  async (params = {}, { rejectWithValue }) => {
    try {
      const data = await getAllComments(params); // data = { comments, total, page, pages }
      return data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Thunk to delete a comment by ID
export const removeAdminComment = createAsyncThunk(
  "adminComments/delete",
  async (id, { rejectWithValue }) => {
    try {
      await deleteComment(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Slice
const adminCommentSlice = createSlice({
  name: "adminComments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    pages: 1,
  },
  reducers: {
    resetAdminComments: (state) => {
      state.comments = [];
      state.total = 0;
      state.page = 1;
      state.pages = 1;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminComments.fulfilled, (state, action) => {
        const { comments, total, page, pages } = action.payload;
        state.loading = false;
        state.comments = comments || [];
        state.total = total || 0;
        state.page = page || 1;
        state.pages = pages || 1;
      })
      .addCase(fetchAdminComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeAdminComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c._id !== action.payload);
        state.total -= 1;
      });
  },
});

export const { resetAdminComments } = adminCommentSlice.actions;
export default adminCommentSlice.reducer;
