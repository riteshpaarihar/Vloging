import Post from "../../schemas/postSchema.js";

export const createPostInDB = async(postData) => {
    try {
        return await Post.create(postData);
    } catch (error) {
        throw new Error("Database error while creating post: " + error.message);
    }
};


export const findAllPosts = async() => {
    return await Post.find().sort({ createdAt: -1 });
};

export const findPostById = async(id) => Post.findById(id);

export const updatePostById = async(id, updateData) =>
    Post.findByIdAndUpdate(id, updateData, { new: true });

export const deletePostById = async(id) => Post.findByIdAndDelete(id);