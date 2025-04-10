
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import messageService from "../../services/messageService";

export const fetchMessages = createAsyncThunk("messages/fetchAll", messageService.getAll);
export const fetchMessage = createAsyncThunk("messages/fetchOne", messageService.getOne);
export const deleteMessage = createAsyncThunk("messages/delete", messageService.remove);
export const toggleReadStatus = createAsyncThunk("messages/toggleRead", messageService.toggleRead);

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    messages: [],
    currentMessage: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelectedMessage: (state) => {
      state.currentMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessage.fulfilled, (state, action) => {
        state.currentMessage = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter((m) => m._id !== action.payload);
      })
      .addCase(toggleReadStatus.fulfilled, (state, action) => {
        const index = state.messages.findIndex((m) => m._id === action.payload._id);
        if (index !== -1) state.messages[index] = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// ✅ Export the action so it can be used in components
export const { clearSelectedMessage } = messageSlice.actions;

export default messageSlice.reducer;
