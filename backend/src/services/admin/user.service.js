// services/user.service.js
import { deleteUserById, findUserById, getAllUsersFromDB, updateUserById } from "../../repository/admin/user.repository.js";

// Get All Users
export const getAllUsersService = async() => {
    const users = await getAllUsersFromDB();
    return users;
};

// Single User
export const getUserByIdService = async(userId) => {
    const user = await findUserById(userId);
    if (!user) {
        throw new Error("User not found");
    }
    return user;
};

// UpDate user Details 
export const updateUserService = async(userId, updateData) => {
    const user = await updateUserById(userId, updateData);
    if (!user) {
        throw new Error("User not found or update failed");
    }
    return user;
};


// Delete User
export const deleteUserService = async(userId) => {
    const deletedUser = await deleteUserById(userId);
    if (!deletedUser) {
        throw new Error("User not found or already deleted");
    }
    return deletedUser;
};