import { handleCreatePost, handleGetAllPosts, handleLikePost } from "../services/postService.js";

// export const createPost = async(req, res) => {
//     try {
//         const post = await handleCreatePost({...req.body, createdBy: req.user._id });
//         res.status(201).json({ success: true, post });
//     } catch (err) {
//         res.status(400).json({ success: false, message: err.message });
//     }
// };

export const likePost = async(req, res) => {
    try {
        const post = await handleLikePost(req.params.postId, req.user._id);
        res.json({ success: true, post });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


export const createPost = async (req, res) => {
    try {
      const imageUrl =await  req.file?.path || "";
      const post = await handleCreatePost({
        ...req.body,
        imageUrl,
        createdBy: req.user._id,
      });
  
      res.status(201).json({ success: true, post });
    } catch (err) {
      res.status(400).json({ success: false, message: err.message });
    }
  };
  

export const getAllPosts = async (req, res) => {
  try {
    const posts = await handleGetAllPosts();
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};