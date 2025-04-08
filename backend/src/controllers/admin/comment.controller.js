import { deleteCommentService, getAllCommentsService } from "../../services/admin/comment.service.js";

export const getAllComments = async(req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = await getAllCommentsService(page, limit);
        res.status(200).json({ success: true, ...result });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const deleteComment = async(req, res) => {
    try {
        const { id } = req.params;
        await deleteCommentService(id);
        res.status(200).json({ success: true, message: "Comment deleted successfully" });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};