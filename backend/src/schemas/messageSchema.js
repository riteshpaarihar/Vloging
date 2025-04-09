import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Sender name is required"],
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    subject: {
        type: String,
        required: [true, "Subject is required"],
        trim: true,
        maxlength: 150,
    },
    message: {
        type: String,
        required: [true, "Message content is required"],
        trim: true,
        maxlength: 1000,
    },
    isRead: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);