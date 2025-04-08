import Post from "../../schemas/postSchema.js";

export const createPostInDB = async(postData) => {
    try {
        return await Post.create(postData);
    } catch (error) {
        throw new Error("Database error while creating post: " + error.message);
    }
};