import User from "../../schemas/userSchema.js";

export const findUserById = async(id) => {
    return await User.findById(id);
};

export const updateUserPasswordInDB = async(id, hashedPassword) => {
    return await User.findByIdAndUpdate(id, { password: hashedPassword }, { new: true });
};