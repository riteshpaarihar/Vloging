// repository/user.repository.js
import User from "../../schemas/userSchema.js";

// Get All Usera
export const getAllUsersFromDB = async() => {
    return await User.find().select("-password"); // Don't return password
};

// Get Single Users 

export const findUserById = async(userId) => {
    return await User.findById(userId).select("-password");
};


// UpDate user Details 

export const updateUserById = async(userId, updateData) => {
    return await User.findByIdAndUpdate(userId, updateData, {
        new: true,
        runValidators: true,
    }).select("-password");
};



// Delete User
export const deleteUserById = async(userId) => {
    return await User.findByIdAndDelete(userId);
};