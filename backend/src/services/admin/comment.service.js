import { deleteCommentById, findAllComments } from "../../repository/admin/comment.repository.js";

import Comment from "../../schemas/commentSchema.js";
// export const getAllCommentsService = async(page, limit) => {
//     const skip = (page - 1) * limit;
//     const [comments, total] = await Promise.all([
//         findAllComments(skip, limit),
//         findAllComments(0, 0, true) // for count
//     ]);

//     return {
//         comments,
//         total,
//         page: Number(page),
//         pages: Math.ceil(total / limit),
//     };
// };

export const getAllCommentsService = async() => {
    const comments = await Comment.find()
        .populate("user", "firstName lastName username") // merged to avoid multiple calls
        .populate("post", "title")
        .sort({ createdAt: -1 });

    return {
        comments,
        total: comments.length,
    };
};
export const deleteCommentService = async(id) => {
    const deleted = await deleteCommentById(id);
    if (!deleted) throw new Error("Comment not found");
};