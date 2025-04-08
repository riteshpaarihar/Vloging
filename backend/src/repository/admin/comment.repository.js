import Comment from "../../schemas/commentSchema.js";

export const findAllComments = async(skip = 0, limit = 10, countOnly = false) => {
    if (countOnly) return await Comment.countDocuments();
    return await Comment.find().skip(skip).limit(limit).sort({ createdAt: -1 });
};

export const deleteCommentById = async(id) => {
    return await Comment.findByIdAndDelete(id);
};