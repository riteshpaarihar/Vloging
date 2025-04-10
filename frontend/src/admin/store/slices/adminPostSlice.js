import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as postService from "../../services/adminPostService";

// Thunks
export const fetchAllPosts = createAsyncThunk("adminPosts/fetchAll", postService.getAllPosts);
export const fetchSinglePost = createAsyncThunk("adminPosts/fetchOne", postService.getPostById);
export const createAdminPost = createAsyncThunk("adminPosts/create", postService.createPost);

const adminPostSlice = createSlice({
    name: "adminPosts",
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
    },
    extraReducers: (builder) => {
        builder
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
                state.error = action.error.message;
            })
            .addCase(fetchSinglePost.fulfilled, (state, action) => {
                state.post = action.payload;
            })

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
                state.error = action.error.message;
                state.success = false;
            });
    },
});

export const { resetCreateStatus } = adminPostSlice.actions;
export default adminPostSlice.reducer;