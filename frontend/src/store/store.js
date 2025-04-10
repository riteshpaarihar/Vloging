// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import adminPostSlice from '../admin/store/slices/adminPostSlice.js'
import adminUserReducer from '../admin/store/slices/adminUserSlice.js'
const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: adminPostSlice,
        adminUsers: adminUserReducer,
    },

});

export default store; // ✅ default export