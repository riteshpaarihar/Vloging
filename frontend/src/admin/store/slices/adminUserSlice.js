import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
    deleteUser,
    getAllUsers,
    getSingleUser,
    resetUserPassword
} from "../../services/adminUserService";

export const fetchUsers = createAsyncThunk("admin/fetchUsers", getAllUsers);
export const fetchUser = createAsyncThunk("admin/fetchUser", getSingleUser);
export const removeUser = createAsyncThunk("admin/removeUser", deleteUser);
export const resetPassword = createAsyncThunk("admin/resetPassword", resetUserPassword);

const adminUserSlice = createSlice({
    name: "adminUsers",
    initialState: {
        users: [],
        selectedUser: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch All
            .addCase(fetchUsers.pending, (state) => { state.loading = true; })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload.users;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

        // Fetch Single
        .addCase(fetchUser.fulfilled, (state, action) => {
            state.selectedUser = action.payload.user;
        })

        // Delete
        .addCase(removeUser.fulfilled, (state, action) => {
            state.users = state.users.filter(user => user._id !== action.meta.arg);
        })

        // Reset Password
        .addCase(resetPassword.fulfilled, (state, action) => {
            console.log("Password reset success:", action.payload);
        });
    }
});

export default adminUserSlice.reducer;