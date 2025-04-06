import {
    createPost,
    findPostById,
    toggleLikePost
} from "../repository/postRepository.js";
import { getAllPosts as getAllPostsFromRepo } from "../repository/postRepository.js";
// Admin: Create new post
export const handleCreatePost = async(data) => {
    const post = await createPost(data);
    return post;
};

// Logged-in user: Like or Unlike a post
export const handleLikePost = async(postId, userId) => {
    const updatedPost = await toggleLikePost(postId, userId);
    return updatedPost;
};

// Optional (if you want to fetch post somewhere)
export const getPostById = async(postId) => {
    const post = await findPostById(postId);
    return post;
};


export const handleGetAllPosts = async() => {
    return await getAllPostsFromRepo();
};