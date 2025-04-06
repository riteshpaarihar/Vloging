import nodemailer from 'nodemailer';

export const sendResetEmail = async(to, token) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'riteshpaarihar@gmail.com', // ✅ your Gmail
            pass: 'imgd rdrq sfwe mavy' // ✅ Use App Password (not Gmail password)
        }
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;
    await transporter.sendMail({
        from: '"Vlogging App" <riteshpaarihar@gmail.com>', // ✅ Properly formatted
        to,
        subject: 'Password Reset Request',
        html: `
      <p>Hello,</p>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
      <p>This link will expire in 15 minutes.</p>
    `
    });
};