import axios from "./api";
import { toast } from "react-toastify";

// Get all comments
export const getAllComments = async () => {
  try {
    const res = await axios.get("/admin/comments");
    return res.data;
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to fetch comments");
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (id) => {
  try {
    await axios.delete(`/admin/comments/${id}`);
    toast.success("Comment deleted successfully");
  } catch (error) {
    toast.error(error?.response?.data?.message || "Failed to delete comment");
    throw error;
  }
};



// import axios from "./api";
// import { toast } from "react-toastify";

// // Get all comments with optional filters and pagination
// export const getAllComments = async (params) => {
//   try {
//     const res = await axios.get("/admin/comments", { params });
//     console.log(res.data)
//     return res.data;
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Failed to fetch comments");
//     throw error;
//   }
// };

// // Delete a specific comment by ID
// export const deleteComment = async (commentId) => {
//   try {
//     await axios.delete(`/admin/comments/${commentId}`);
//     toast.success("Comment deleted successfully");
//     return commentId;
//   } catch (error) {
//     toast.error(error?.response?.data?.message || "Failed to delete comment");
//     throw error;
//   }
// };
