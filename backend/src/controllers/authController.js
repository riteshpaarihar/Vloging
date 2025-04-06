
import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
    try {

    //     console.log('🔥 Register controller hit');
    // console.log('📦 Form Data:', req.body);
    // console.log('🖼️ File:', req.file);

        const userData = {
            ...req.body,
            profileImagePath: req.file?.path, // ✅ Add local file path for cloudinary upload
        };

        const user = await registerUser(userData);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || "Registration failed",
        });
    }
};


export const login = async (req, res) => {
    try {
        const { identifier, password } = req.body;
        const data = await loginUser({ identifier, password });
        res.status(200).json({
            success: true,
            message: "Login successful",
            ...data,
        });
    } catch (err) {
        res.status(401).json({
            success: false,
            message: err.message || "Login failed",
        });
    }
};


