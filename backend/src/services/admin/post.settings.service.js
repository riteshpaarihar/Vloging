import { findPostById, updateAllowCommentsStatus } from "../../repository/admin/post.settings.repository.js";

export const toggleAllowCommentsService = async(id) => {
    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");

    const updatedPost = await updateAllowCommentsStatus(id, !post.allowComments);
    return updatedPost;
};