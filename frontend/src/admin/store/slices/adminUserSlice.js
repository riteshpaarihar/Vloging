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
//export const resetPassword = createAsyncThunk("admin/resetPassword", resetUserPassword);
export const resetPassword = createAsyncThunk(
    "admin/resetPassword",
    async({ id, data }) => {
        return await resetUserPassword(id, data);
    }
);

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
        .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.successMessage = null;
                state.error = null;
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false;
                state.successMessage = "Password reset successfully";
            });


    }
});

export default adminUserSlice.reducer;