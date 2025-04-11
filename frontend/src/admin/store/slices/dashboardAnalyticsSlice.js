import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import dashboardAnalyticsService from "../../services/dashboardAnalyticsService";

// Async Thunks
export const fetchStats = createAsyncThunk("analytics/fetchStats", async() => {
    const res = await dashboardAnalyticsService.getStats();
    return res;
});

export const fetchPostAnalytics = createAsyncThunk("analytics/fetchPostAnalytics", async() => {
    const res = await dashboardAnalyticsService.getPostAnalytics();
    return res;
});

export const fetchSignupAnalytics = createAsyncThunk("analytics/fetchSignupAnalytics", async() => {
    const res = await dashboardAnalyticsService.getSignupAnalytics();
    return res;
});

export const fetchTopPosts = createAsyncThunk("analytics/fetchTopPosts", async() => {
    const res = await dashboardAnalyticsService.getTopPosts();
    return res;
});

export const fetchCategoryPopularity = createAsyncThunk("analytics/fetchCategoryPopularity", async() => {
    const res = await dashboardAnalyticsService.getCategoryPopularity();
    return res;
});

// Initial State
const initialState = {
    stats: {},
    posts: [],
    signups: [],
    topPosts: [],
    categoryPopularity: [],

    statsLoading: false,
    postsLoading: false,
    signupsLoading: false,
    topPostsLoading: false,
    categoryPopularityLoading: false,

    error: null,
};

// Slice
const dashboardAnalyticsSlice = createSlice({
    name: "dashboardAnalytics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Stats
        builder
            .addCase(fetchStats.pending, (state) => {
                state.statsLoading = true;
            })
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.statsLoading = false;
                state.stats = action.payload;
            })
            .addCase(fetchStats.rejected, (state, action) => {
                state.statsLoading = false;
                state.error = action.error.message;
            });

        // Post Analytics
        builder
            .addCase(fetchPostAnalytics.pending, (state) => {
                state.postsLoading = true;
            })
            .addCase(fetchPostAnalytics.fulfilled, (state, action) => {
                state.postsLoading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPostAnalytics.rejected, (state, action) => {
                state.postsLoading = false;
                state.error = action.error.message;
            });

        // Signup Analytics
        builder
            .addCase(fetchSignupAnalytics.pending, (state) => {
                state.signupsLoading = true;
            })
            .addCase(fetchSignupAnalytics.fulfilled, (state, action) => {
                state.signupsLoading = false;
                state.signups = action.payload;
            })
            .addCase(fetchSignupAnalytics.rejected, (state, action) => {
                state.signupsLoading = false;
                state.error = action.error.message;
            });

        // Top Posts
        builder
            .addCase(fetchTopPosts.pending, (state) => {
                state.topPostsLoading = true;
            })
            .addCase(fetchTopPosts.fulfilled, (state, action) => {
                state.topPostsLoading = false;
                state.topPosts = action.payload;
            })
            .addCase(fetchTopPosts.rejected, (state, action) => {
                state.topPostsLoading = false;
                state.error = action.error.message;
            });

        // Category Popularity
        builder
            .addCase(fetchCategoryPopularity.pending, (state) => {
                state.categoryPopularityLoading = true;
            })
            .addCase(fetchCategoryPopularity.fulfilled, (state, action) => {
                state.categoryPopularityLoading = false;
                state.categoryPopularity = action.payload;
            })
            .addCase(fetchCategoryPopularity.rejected, (state, action) => {
                state.categoryPopularityLoading = false;
                state.error = action.error.message;
            });
    },
});

export default dashboardAnalyticsSlice.reducer;