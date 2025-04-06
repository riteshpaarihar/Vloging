import { findUserByEmail, updateUserPassword, savePasswordResetToken, findUserByResetToken } from '../repository/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendResetEmail } from '../services/emailService.js'; // Implement email sending
import { JWT_SECRET } from '../config/serverConfig.js';

export const requestPasswordReset = async(req, res) => {
    const { email } = req.body;
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '15m' });
    await savePasswordResetToken(user._id, token); // Optional: Store in DB

    await sendResetEmail(email, token); // Implement this

    res.json({ success: true, message: 'Password reset link sent' });
};

export const resetPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await findUserByResetToken(token); // Or verify id from decoded

        if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });

        const hashedPassword = await bcrypt.hash(password, 10);
        await updateUserPassword(user._id, hashedPassword);

        res.json({ success: true, message: 'Password reset successful' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }
};