import axios from "./api.js"; 



export const createPost = async (formData) => {
  const response = await axios.post("/admin/post", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
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
   //   console.log(res.data.post);
      return res.data.post; // ✅ Return only the post object
    } catch (error) {
      throw error.response?.data?.message || "Something went wrong";
    }
  };
  
  
// Update post
// export const updatePost = async(id, data) => {
//     const res = await axios.put(`/admin/post/${id}`, data);
//     return res.data;
// };
// adminPostService.js
export const updatePost = async (id, data) => {
  const response = await axios.put(`/admin/post/edit/${id}`, data);
  return response.data;
};


// Delete post
export const deletePost = async(id) => {
    const res = await axios.delete(`/admin/post/${id}`);
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