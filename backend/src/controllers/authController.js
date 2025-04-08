
import { loginUser, registerUser } from "../services/authService.js";

export const register = async (req, res) => {
    try {

    //     console.log('🔥 Register controller hit');
    // console.log('📦 Form Data:', req.body);
    // console.log('🖼️ File:', req.file);

        const userData = {
            ...req.body,
           // profileImagePath: req.file?.path, // ✅ Add local file path for cloudinary upload
           profileImageBuffer: req.file?.buffer,
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


// export const login = async (req, res) => {
//     try {
//         const { identifier, password } = req.body;
//         const data = await loginUser({ identifier, password });
//         res.status(200).json({
//             success: true,
//             message: "Login successful",
//             ...data,
//         });
//     } catch (err) {
//         res.status(401).json({
//             success: false,
//             message: err.message || "Login failed",
//         });
//     }
// };

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const { token, user } = await loginUser({ identifier, password });

    // ✅ Set cookie here
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "Lax", // or "None" + secure:true for cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user,
      token,
    });

  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

