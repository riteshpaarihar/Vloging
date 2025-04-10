import axios from "./api.js"; // assumes you have a configured instance

// Create a post
export const createPost = async (formData) => {
      try {
        const res = await axios.post("/admin/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          return res.data;
      } catch (error) {
        throw error.response?.data || "Failed to fetch post";
      }
  };

// Get all posts
export const getAllPosts = async () => {
    try {
      const res = await axios.get("/admin/post");
      return res.data;
    } catch (error) {
      console.error("getAllPosts error:", error.response?.data || error.message);
      throw error;
    }
  };


// Get single post
export const getPostById = async (id) => {
    try {
      const res = await axios.get(`/admin/post/${id}`);
      console.log(res.data.post);
      return res.data.post; // ✅ Return only the post object
    } catch (error) {
      throw error.response?.data?.message || "Something went wrong";
    }
  };
  
  
// Update post
export const updatePost = async(id, data) => {
    const res = await axios.put(`/admin/post/${id}`, data);
    return res.data;
};

// Delete post
export const deletePost = async(id) => {
    const res = await axios.delete(`/api/admin/post/${id}`);
    return res.data;
};

// Toggle publish/unpublish
export const togglePublish = async(id) => {
    const res = await axios.patch(`/admin/post/${id}/publish`);
    return res.data;
};

// Toggle featured
export const toggleFeatured = async(id) => {
    const res = await axios.patch(`/admin/post/${id}/feature`);
    return res.data;
};

// Toggle allow comments
export const toggleAllowComments = async(id) => {
    const res = await axios.patch(`/admin/post/${id}/allow-comments`);
    return res.data;
};