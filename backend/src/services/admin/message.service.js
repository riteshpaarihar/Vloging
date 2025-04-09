import {
    getAllMessagesFromDB,
    getSingleMessageFromDB,
    deleteMessageFromDB,
    toggleMessageReadStatusInDB,
} from "../../repository/admin/message.repository.js";

export const getAllMessagesService = async() => {
    return await getAllMessagesFromDB();
};

export const getSingleMessageService = async(id) => {
    const message = await getSingleMessageFromDB(id);
    if (!message) throw new Error("Message not found");
    return message;
};

export const deleteMessageService = async(id) => {
    const deleted = await deleteMessageFromDB(id);
    if (!deleted) throw new Error("Message not found or already deleted");
    return deleted;
};

export const toggleReadStatusService = async(id) => {
    const updatedMessage = await toggleMessageReadStatusInDB(id);
    if (!updatedMessage) throw new Error("Message not found");
    return updatedMessage;
};