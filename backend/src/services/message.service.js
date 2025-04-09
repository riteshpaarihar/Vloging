import { createMessage } from '../repository/message.repository.js';


export const createUserMessageService = async(data) => await createMessage(data);