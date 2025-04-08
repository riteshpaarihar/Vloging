import { deleteCommentById, findAllComments } from "../../repository/admin/comment.repository.js";


export const getAllCommentsService = async(page, limit) => {
    const skip = (page - 1) * limit;
    const [comments, total] = await Promise.all([
        findAllComments(skip, limit),
        findAllComments(0, 0, true) // for count
    ]);

    return {
        comments,
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
    };
};

export const deleteCommentService = async(id) => {
    const deleted = await deleteCommentById(id);
    if (!deleted) throw new Error("Comment not found");
};