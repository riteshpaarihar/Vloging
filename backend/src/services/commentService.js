import {
    createComment,
    likeComment
} from "../repository/commentRepository.js";

// Create a comment or reply
export const handleComment = async(data) => {
    // This now also handles incrementing counts (handled in repository)
    const comment = await createComment(data);
    return comment;
};

// Like or unlike a comment
export const handleLikeComment = async(commentId, userId) => {
    const updatedComment = await likeComment(commentId, userId);
    return updatedComment;
};