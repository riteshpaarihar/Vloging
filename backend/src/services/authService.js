import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/serverConfig.js";
import {
    createUser,
    findUserByEmail,
    findUserByEmailOrMobile,
    findUserByUsermobileNumber,
    findUserByUsername,
} from "../repository/userRepository.js";


// export const registerUser = async(data) => {
//     const { email, username, mobileNumber, profileImagePath } = data;

//     // Check if email already exists
//     const existingEmail = await findUserByEmail(email);
//     if (existingEmail) throw new Error("Email already exists");

//     const existingUsername = await findUserByUsername(username);
//     if (existingUsername) throw new Error("Username already exists");

//     const existingUsermobileNumber = await findUserByUsermobileNumber(mobileNumber);
//     if (existingUsermobileNumber) throw new Error("Mobile number already exists");

//     let cloudinaryUrl = "";

//     // ✅ Upload image to Cloudinary if exists
//     if (profileImagePath) {
//         const imagePath = path.resolve(profileImagePath);
//         const result = await cloudinary.uploader.upload(imagePath, {
//             folder: "vlogging_users",
//             width: 300,
//             crop: "scale",
//         });

//         cloudinaryUrl = result.secure_url;

//         // ✅ Delete local file after upload
//         fs.unlinkSync(imagePath);
//     }

//     // ✅ Create new user
//     const user = await createUser({
//         ...data,
//         profileImage: cloudinaryUrl,
//     });

//     return {
//         id: user._id,
//         email: user.email,
//         username: user.username,
//         role: user.role,
//         mobileNumber: user.mobileNumber,
//         profileImage: user.profileImage,
//         createdAt: user.createdAt,
//         updatedAt: user.updatedAt,
//     };
// };


const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
                folder: "vlogging_users",
                resource_type: "image",
                width: 300,
                crop: "scale",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

export const registerUser = async(data) => {
    const { email, username, mobileNumber, profileImageBuffer } = data;

    // ✅ Check duplicates
    const existingEmail = await findUserByEmail(email);
    if (existingEmail) throw new Error("Email already exists");

    const existingUsername = await findUserByUsername(username);
    if (existingUsername) throw new Error("Username already exists");

    const existingUsermobileNumber = await findUserByUsermobileNumber(mobileNumber);
    if (existingUsermobileNumber) throw new Error("Mobile number already exists");

    let cloudinaryUrl = "";

    // ✅ Upload image from buffer
    if (profileImageBuffer) {
        cloudinaryUrl = await streamUpload(profileImageBuffer);
    }

    // ✅ Create user
    const user = await createUser({
        ...data,
        profileImage: cloudinaryUrl,
    });

    return {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        mobileNumber: user.mobileNumber,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};

export const loginUser = async({ identifier, password }) => {
    const user = await findUserByEmailOrMobile(identifier);
    if (!user) throw new Error("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid password");

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
        expiresIn: "7d",
    });


    return {
        token,
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            firstName: user.firstName || "",
        },
    };
};