import { toggleAllowCommentsService } from "../../services/admin/post.settings.service.js";

export const toggleAllowCommentsController = async(req, res) => {
    try {
        const { id } = req.params;
        const updatedPost = await toggleAllowCommentsService(id);

        res.status(200).json({
            success: true,
            message: `Comments ${updatedPost.allowComments ? "enabled" : "disabled"} for the post.`,
            data: updatedPost,
        });
    } catch (error) {
        console.error("Toggle Comments Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};