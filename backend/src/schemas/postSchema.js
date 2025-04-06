import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
        unique: true,
    },
    content: {
        type: String,
        required: [true, "Post content is required"],
        trim: true,
    },
    imageUrl: {
        type: String,
        default: "", // Cloudinary URL
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [{ // ✅ Add this block
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],
    likeCount: {
        type: Number,
        default: 0,
    },
    commentCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

export default mongoose.model("Post", postSchema);