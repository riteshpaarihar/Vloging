import Message from '../schemas/messageSchema.js';

export const createMessage = async(data) => await Message.create(data);