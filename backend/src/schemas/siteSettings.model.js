import mongoose from 'mongoose';

const siteSettingsSchema = new mongoose.Schema({
    siteName: {
        type: String,
        required: [true, "Site name is required"],
        trim: true,
        maxlength: [100, "Maximum 100 characters"],
        default: "My Vlog Site",

    },
    siteDescription: {
        type: String,
        trim: true,
        maxlength: [300, "Maximum 300 characters"]
    },
    logoUrl: {
        type: String,
        default: "https://res.cloudinary.com/dexfdwvgf/image/upload/v1743919652/vlogging_users/s4w0u7reyxmp5gkklfdo.webp"
    },
    faviconUrl: {
        type: String,
        default: "https://res.cloudinary.com/dexfdwvgf/image/upload/v1743919652/vlogging_users/s4w0u7reyxmp5gkklfdo.webp"
    },
    contactEmail: {
        type: String,
        trim: true,
        match: [/\S+@\S+\.\S+/, "Invalid contact email"]
    },
    socialLinks: {
        facebook: { type: String, trim: true },
        twitter: { type: String, trim: true },
        instagram: { type: String, trim: true },
        youtube: { type: String, trim: true }
    },
    maintenanceMode: {
        type: Boolean,
        default: false
    },
    showFeaturedVlogs: {
        type: Boolean,
        default: true
    },
    themeColor: {
        type: String,
        default: "#ff3c3c"
    }
}, { timestamps: true });

export default mongoose.model("SiteSettings", siteSettingsSchema);