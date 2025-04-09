import Post from "../../schemas/postSchema.js";

export const findPostById = async(id) => {
    return await Post.findById(id);
};

export const updateAllowCommentsStatus = async(id, status) => {
    return await Post.findByIdAndUpdate(id, { allowComments: status }, { new: true });
};