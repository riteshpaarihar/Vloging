import { resetUserPasswordService } from '../../services/admin/user.password.reset.service.js';

export const resetUserPasswordController = async(req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        await resetUserPasswordService(id, newPassword);
        res.status(200).json({ success: true, message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset Password Error:", error.message);
        res.status(500).json({ success: false, message: error.message });
    }
};