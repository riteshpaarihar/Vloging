import Message from "../../schemas/messageSchema.js";

export const getAllMessagesFromDB = async() => {
    return await Message.find().sort({ createdAt: -1 });
};

export const getSingleMessageFromDB = async(id) => {
    return await Message.findById(id);
};

export const deleteMessageFromDB = async(id) => {
    return await Message.findByIdAndDelete(id);
};

export const toggleMessageReadStatusInDB = async(id) => {
    const message = await Message.findById(id);
    if (!message) return null;

    message.isRead = !message.isRead;
    return await message.save();
};