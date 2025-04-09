import {
    getAllMessagesService,
    getSingleMessageService,
    deleteMessageService,
    toggleReadStatusService,
} from "../../services/admin/message.service.js";

export const getAllMessages = async(req, res) => {
    try {
        const messages = await getAllMessagesService();
        res.status(200).json({ success: true, data: messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getSingleMessage = async(req, res) => {
    try {
        const { id } = req.params;
        const message = await getSingleMessageService(id);
        res.status(200).json({ success: true, data: message });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const deleteMessage = async(req, res) => {
    try {
        const { id } = req.params;
        await deleteMessageService(id);
        res.status(200).json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};

export const markMessageAsRead = async(req, res) => {
    try {
        const { id } = req.params;
        const updated = await toggleReadStatusService(id);
        res.status(200).json({
            success: true,
            message: `Message marked as ${updated.isRead ? "read" : "unread"}`,
            data: updated,
        });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
};