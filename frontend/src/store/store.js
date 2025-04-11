import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import adminPostSlice from '../admin/store/slices/adminPostSlice.js';
import adminUserReducer from '../admin/store/slices/adminUserSlice.js';
import adminMessageReducer from "../admin/store/slices/messageSlice.js";
import adminCommentReducer from "../admin/store/slices/adminCommentSlice.js"; // ✅ fixed!
import dashboardAnalyticsReducer from "../admin/store/slices/dashboardAnalyticsSlice.js"
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: adminPostSlice,
        adminUsers: adminUserReducer,
        adminMessages: adminMessageReducer,
        adminComments: adminCommentReducer, // ✅ correct reducer
        dashboardAnalytics: dashboardAnalyticsReducer,
    },
});

export default store;