import { handleComment, handleLikeComment } from "../services/commentService.js";



export const commentOnPost = async(req, res) => {
    try {
        const comment = await handleComment({
            post: req.params.postId,
            text: req.body.text,
            parentComment: req.body.parentComment || null,
            user: req.user._id,
        });

        res.status(201).json({ success: true, comment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};


export const likeComment = async(req, res) => {
    try {
        const comment = await handleLikeComment(req.params.commentId, req.user._id);
        res.json({ success: true, comment });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};