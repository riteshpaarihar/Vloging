import axios from "./api.js"; 

// Create a post
// export const createPost = async (formData) => {
//       try {
//         const res = await axios.post("/admin/post", formData, {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           });
//           return res.data;
//       } catch (error) {
//         throw error.response?.data || "Failed to fetch post";
//       }
//   };

// export const createPost = async (data) => {
//   const formData = new FormData();

//   for (const [key, value] of Object.entries(data)) {
//     if (key === "tags" || key === "metaKeywords") {
//       formData.append(key, JSON.stringify(value.split(",").map((x) => x.trim())));
//     } else {
//       formData.append(key, value);
//     }
//   }

//   const response = await axios.post("/admin/post", formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };


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