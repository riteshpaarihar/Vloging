import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [3, "Minimum 3 characters"],
        maxlength: [50, "Maximum 50 characters"],
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [3, "Minimum 3 characters"],
        maxlength: [50, "Maximum 50 characters"],
        trim: true,
        lowercase: true,
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    mobileNumber: {
        type: String,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Minimum 8 characters"],
        maxlength: [16, "Maximum 16 characters"],
        select: false,
    },
    profileImage: {
        type: String, // Cloudinary URL
        default: "", // optional default avatar
    },
    bio: {
        type: String,
        maxlength: 300,
        trim: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });


// 🔐 Hash password before save
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

export default User;