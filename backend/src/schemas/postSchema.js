import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    // Post title (unique, used for display and SEO)
    title: {
        type: String,
        required: [true, "Post title is required"],
        trim: true,
        minlength: 3,
        maxlength: 100,
        unique: true,
    },

    // Slug is a URL-friendly version of the title (for SEO-friendly URLs)
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
    },

    // Main content of the post
    content: {
        type: String,
        required: [true, "Post content is required"],
        trim: true,
    },

    // Image URL for the post thumbnail or banner
    imageUrl: {
        type: String,
        default: "",
    },

    // Alt text for the image (important for accessibility and SEO)
    altText: {
        type: String,
        default: "Vlog image",
    },

    // Category of the post (used for filtering and organizing content)
    category: {
        type: String,
        enum: ["Travel", "Tech", "Fitness", "Lifestyle", "Food"], // You can expand this list
        required: true,
    },

    // Tags or keywords for searching and filtering
    tags: {
        type: [String],
        default: [],
    },

    // Meta title for SEO
    metaTitle: {
        type: String,
        trim: true,
    },

    // Meta description for SEO
    metaDescription: {
        type: String,
        trim: true,
    },

    // Meta keywords for SEO
    metaKeywords: {
        type: [String],
        default: [],
    },

    // Estimated reading time (can be auto-calculated later)
    readingTime: {
        type: String,
    },

    // Total number of views
    views: {
        type: Number,
        default: 0,
    },

    // Reference to the user who created the post
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    // Reference to the user who last updated the post
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    // List of users who liked the post
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    // Total like count (can be derived but stored for quick access)
    likeCount: {
        type: Number,
        default: 0,
    },

    // Total comment count
    commentCount: {
        type: Number,
        default: 0,
    },

    // Allow or disable comments for this post
    allowComments: {
        type: Boolean,
        default: true,
    },

    // Optional scheduled publish time
    publishAt: {
        type: Date,
        default: Date.now, // Automatically sets current time if not provided
    },


    // Mark as featured to show on homepage/slider etc.
    isFeatured: {
        type: Boolean,
        default: false,
    },

    // Mark whether the post is publicly visible
    isPublished: {
        type: Boolean,
        default: false,
    }

}, { timestamps: true }); // Automatically add createdAt and updatedAt

export default mongoose.model("Post", postSchema);