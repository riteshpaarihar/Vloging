import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, "Comment text is required"],
        trim: true,
        maxlength: 500,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    parentComment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        default: null,
    },
    likeCount: {
        type: Number,
        default: 0,
    },
    replyCount: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });


export default mongoose.model("Comment", commentSchema);