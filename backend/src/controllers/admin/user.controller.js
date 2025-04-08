// controllers/user.controller.js
import { deleteUserService, getAllUsersService, getUserByIdService, updateUserService } from "../../services/admin/user.service.js";


// Get All User
export const getallUsers = async(req, res) => {
    try {
        const users = await getAllUsersService();
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
            error: error.message,
        });
    }
};


// Get Single user
export const getSingleUser = async(req, res) => {
    try {
        const user = await getUserByIdService(req.params.id);
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || "User not found",
        });
    }
};

// UpDate user Details 
export const updateUser = async(req, res) => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


// Delete User

export const deleteUser = async(req, res) => {
    try {
        await deleteUserService(req.params.id);
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};