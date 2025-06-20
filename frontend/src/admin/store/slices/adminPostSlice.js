// // // src/store/adminPostSlice.js
// // import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// // import * as postService from "../../services/adminPostService";

// // // Thunks
// // export const fetchAllPosts = createAsyncThunk(
// //   "adminPosts/fetchAll",
// //   postService.getAllPosts
// // );
// // export const fetchSinglePost = createAsyncThunk(
// //   "adminPosts/fetchOne",
// //   postService.getPostById
// // );
// // export const createAdminPost = createAsyncThunk(
// //   "adminPosts/create",
// //   async (postData, { rejectWithValue }) => {
// //     try {
// //       const response = await postService.createPost(postData);
// //       return response;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data || { message: error.message }
// //       );
// //     }
// //   }
// // );

// // export const deleteAdminPost = createAsyncThunk(
// //   "adminPosts/delete",
// //   async (postId, { rejectWithValue }) => {
// //     try {
// //       await postService.deletePost(postId);
// //       return postId; // return deleted ID to remove it from state
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data || { message: error.message }
// //       );
// //     }
// //   }
// // );
// // export const updateAdminPost = createAsyncThunk(
// //   "adminPosts/update",
// //   async ({ id, postData }, { rejectWithValue }) => {
// //     try {
// //       const response = await postService.updatePost(id, postData);
// //       return response;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data || { message: error.message }
// //       );
// //     }
// //   }
// // );
// // const adminPostSlice = createSlice({
// //   // name: "adminPosts",
// //   name: "posts",
// //   initialState: {
// //     posts: [],
// //     post: null,
// //     loading: false,
// //     error: null,
// //     success: false,
// //   },
// //   reducers: {
// //     resetCreateStatus: (state) => {
// //       state.success = false;
// //       state.error = null;
// //     },
// //   },
// //   extraReducers: (builder) => {
// //     builder
// //       .addCase(fetchAllPosts.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //       })
// //       .addCase(fetchAllPosts.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.posts = action.payload;
// //       })
// //       .addCase(fetchAllPosts.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || action.error.message;
// //       })
// //       .addCase(fetchSinglePost.fulfilled, (state, action) => {
// //         state.post = action.payload;
// //       })
// //       .addCase(createAdminPost.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //         state.success = false;
// //       })
// //       .addCase(createAdminPost.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.posts.unshift(action.payload);
// //       })
// //       .addCase(createAdminPost.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || action.error.message;
// //         state.success = false;
// //       })
// //       .addCase(deleteAdminPost.fulfilled, (state, action) => {
// //         state.posts = state.posts.filter((post) => post._id !== action.payload);
// //       })
// //       .addCase(deleteAdminPost.rejected, (state, action) => {
// //         state.error = action.payload?.message || action.error.message;
// //       })
// //       .addCase(updateAdminPost.fulfilled, (state, action) => {
// //         state.loading = false;
// //         state.success = true;
// //         state.posts = state.posts.map((post) =>
// //           post._id === action.payload._id ? action.payload : post
// //         );
// //       })
// //       .addCase(updateAdminPost.pending, (state) => {
// //         state.loading = true;
// //         state.error = null;
// //         state.success = false;
// //       })
// //       .addCase(updateAdminPost.rejected, (state, action) => {
// //         state.loading = false;
// //         state.error = action.payload?.message || action.error.message;
// //         state.success = false;
// //       })
// //   },
// // });

// // export const { resetCreateStatus } = adminPostSlice.actions;
// // export default adminPostSlice.reducer;

// // src/store/adminPostSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import * as postService from "../../services/adminPostService";

// // Thunks
// export const fetchAllPosts = createAsyncThunk(
//   "adminPosts/fetchAll",
//   postService.getAllPosts
// );

// export const fetchSinglePost = createAsyncThunk(
//   "adminPosts/fetchOne",
//   postService.getPostById
// );

// export const createAdminPost = createAsyncThunk(
//   "adminPosts/create",
//   async (postData, { rejectWithValue }) => {
//     try {
//       const response = await postService.createPost(postData);
//       return response;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: error.message }
//       );
//     }
//   }
// );

// export const deleteAdminPost = createAsyncThunk(
//   "adminPosts/delete",
//   async (postId, { rejectWithValue }) => {
//     try {
//       await postService.deletePost(postId);
//       return postId; // return deleted ID to remove it from state
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: error.message }
//       );
//     }
//   }
// );

// // export const updateAdminPost = createAsyncThunk(
// //   "adminPosts/update",
// //   async ({ id, data: postData }, { rejectWithValue }) => {
// //     try {
// //       const response = await postService.updatePost(id, postData);
// //       return response;
// //     } catch (error) {
// //       return rejectWithValue(
// //         error.response?.data || { message: error.message }
// //       );
// //     }
// //   }
// // );

// // In adminPostSlice.js
// export const updateAdminPost = createAsyncThunk(
//   "posts/update",
//   async ({ id, data }, thunkAPI) => {
//     try {
//       const response = await postService.updatePost(id, data);
//       return response.data;
//     } catch (err) {
//       return thunkAPI.rejectWithValue(err.response.data.message || "Update failed");
//     }
//   }
// );

// const adminPostSlice = createSlice({
//   name: "posts",
//   initialState: {
//     posts: [],
//     post: null,
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     resetCreateStatus: (state) => {
//       state.success = false;
//       state.error = null;
//     },
//     resetUpdateStatus: (state) => {
//       state.success = false;
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchAllPosts.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchAllPosts.fulfilled, (state, action) => {
//         state.loading = false;
//         state.posts = action.payload;
//       })
//       .addCase(fetchAllPosts.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || action.error.message;
//       })

//       .addCase(fetchSinglePost.fulfilled, (state, action) => {
//         state.post = action.payload;
//       })

//       .addCase(createAdminPost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createAdminPost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.posts.unshift(action.payload);
//       })
//       .addCase(createAdminPost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || action.error.message;
//         state.success = false;
//       })

//       .addCase(deleteAdminPost.fulfilled, (state, action) => {
//         state.posts = state.posts.filter((post) => post._id !== action.payload);
//       })
//       .addCase(deleteAdminPost.rejected, (state, action) => {
//         state.error = action.payload?.message || action.error.message;
//       })

//       .addCase(updateAdminPost.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updateAdminPost.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.posts = state.posts.map((post) =>
//           post._id === action.payload._id ? action.payload : post
//         );
//       })
//       .addCase(updateAdminPost.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || action.error.message;
//         state.success = false;
//       });
//   },
// });

// export const { resetCreateStatus, resetUpdateStatus } = adminPostSlice.actions;

// export default adminPostSlice.reducer;

// src/store/adminPostSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postService from "../../services/adminPostService";

// Thunks
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAll",
  postService.getAllPosts
);

export const fetchSinglePost = createAsyncThunk(
  "posts/fetchOne",
  postService.getPostById
);

export const createAdminPost = createAsyncThunk(
  "posts/create",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await postService.createPost(postData);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const deleteAdminPost = createAsyncThunk(
  "posts/delete",
  async (postId, { rejectWithValue }) => {
    try {
      await postService.deletePost(postId);
      return postId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

// export const updateAdminPost = createAsyncThunk(
//   "posts/update",
//   async ({ id, data }, { rejectWithValue }) => {
//     try {
//       const response = await postService.updatePost(id, data);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data || { message: error.message }
//       );
//     }
//   }
// );

// In slice
export const updateAdminPost = createAsyncThunk(
  "posts/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await postService.updatePost(id, data);
      return response; // ❌ Don't use response.data again
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);


// Slice
const adminPostSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    post: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetCreateStatus: (state) => {
      state.success = false;
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
      })

      // Fetch single post
      .addCase(fetchSinglePost.fulfilled, (state, action) => {
        state.post = action.payload;
      })

      // Create post
      .addCase(createAdminPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAdminPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts.unshift(action.payload);
      })
      .addCase(createAdminPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.success = false;
      })

      // Delete post
      .addCase(deleteAdminPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post._id !== action.payload);
      })
      .addCase(deleteAdminPost.rejected, (state, action) => {
        state.error = action.payload?.message || action.error.message;
      })

      // Update post
      .addCase(updateAdminPost.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateAdminPost.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })
      .addCase(updateAdminPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || action.error.message;
        state.success = false;
      });
  },
});

export const { resetCreateStatus, resetUpdateStatus } = adminPostSlice.actions;
export default adminPostSlice.reducer;
