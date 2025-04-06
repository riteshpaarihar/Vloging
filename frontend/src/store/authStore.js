
import { create } from "zustand";
import axiosInstance from "../utils/axiosInstance.js"; // your axiosInstance

const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  fetchUser: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get("/auth/me"); // 🔁 Make sure this endpoint exists
      set({ user: response.data.user, loading: false });
    } catch (err) {
      set({ user: null, error: err.response?.data?.message || err.message, loading: false });
    }
  },

}));

export default useAuthStore;
