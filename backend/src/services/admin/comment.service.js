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

export const getAllCommentsService = async(page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [comments, total] = await Promise.all([
        Comment.find()
        .populate("user", "username") // ✅ only get the username
        .populate("post", "title") // ✅ only get the title
        .populate("user", "firstName lastName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
        Comment.countDocuments(),
    ]);

    const pages = Math.ceil(total / limit);

    return {
        comments,
        total,
        page: Number(page),
        pages,
    };
};
export const deleteCommentService = async(id) => {
    const deleted = await deleteCommentById(id);
    if (!deleted) throw new Error("Comment not found");
};