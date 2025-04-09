import {
    createUserMessageService
} from '../services/message.service.js';

export const createMessageController = async(req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMsg = await createUserMessageService({ name, email, subject, message });
        res.status(201).json({ success: true, message: "Message sent successfully", data: newMsg });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};