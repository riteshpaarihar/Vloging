// // src/admin/services/adminUserService.js
// import axios from "./api";

// export const getAllUsers = async () => {
//   try {
//     const res = await axios.get("/admin/users");
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch users");
//   }
// };

// export const getSingleUser = async (id) => {
//   try {
//     const res = await axios.get(`/admin/users/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to fetch user");
//   }
// };

// export const deleteUser = async (id) => {
//   try {
//     const res = await axios.delete(`/admin/users/${id}`);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to delete user");
//   }
// };

// export const resetUserPassword = async (id, data) => {
//   try {
//     const res = await axios.post(`/admin/users/${id}/reset-password`, data);
//     return res.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "Failed to reset password");
//   }
// };


// src/admin/services/adminUserService.js
import axios from "./api";
import { toast } from "react-toastify";

export const getAllUsers = async () => {
  try {
    const res = await axios.get("/admin/users");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch users";
    toast.error(message);
    throw new Error(message);
  }
};

export const getSingleUser = async (id) => {
  try {
    const res = await axios.get(`/admin/users/${id}`);
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to fetch user";
    toast.error(message);
    throw new Error(message);
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await axios.delete(`/admin/users/${id}`);
    toast.success("User deleted successfully");
    return res.data;
  } catch (error) {
    const message = error.response?.data?.message || "Failed to delete user";
    toast.error(message);
    throw new Error(message);
  }
};

export const resetUserPassword = async (id, data) => {
    try {
      const res = await axios.post(`/admin/user/${id}/reset-password`, data); // ✅ plural "users"
      toast.success("Password reset successfully");
      return res.data;
    } catch (error) {
      const message = error.response?.data?.message || "Failed to reset password";
      toast.error(message);
      throw new Error(message);
    }
  };
  
  
  
