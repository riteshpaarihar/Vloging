import User from "../schemas/userSchema.js";

export const createUser = async(userData) => {
    const user = new User(userData);
    return await user.save();
};

export const findUserByEmail = async(email) => {
    return await User.findOne({ email });
};

export const findUserByUsername = async(username) => {
    return await User.findOne({ username });
};

export const findUserByUsermobileNumber = async(mobileNumber) => {
    return await User.findOne({ mobileNumber });
};


export const findUserByEmailOrMobile = async(identifier) => {
    return await User.findOne({
        $or: [{ email: identifier }, { mobileNumber: identifier }],
    }).select("+password"); // include password field
};


export const savePasswordResetToken = async(userId, token) => {
    return await User.findByIdAndUpdate(userId, { resetToken: token });
};

export const findUserByResetToken = async(token) => {
    return await User.findOne({ resetToken: token });
};

export const updateUserPassword = async(userId, newPassword) => {
    return await User.findByIdAndUpdate(userId, { password: newPassword, resetToken: null });
};