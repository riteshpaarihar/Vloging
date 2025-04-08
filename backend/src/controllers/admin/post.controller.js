import { createPostService } from "../../services/admin/post.service.js";
import cloudinary from "../../middleware/upload.js";
import fs from "fs";

export const createPost = async (req, res) => {
  try {
    const {
      title,
      slug,
      content,
      altText,
      category,
      tags,
      metaTitle,
      metaDescription,
      metaKeywords,
      readingTime,
      publishAt,
      allowComments,
      isFeatured,
      isPublished,
    } = req.body;

    let imageUrl = "https://res.cloudinary.com/dexfdwvgf/image/upload/v1744011946/vlogging_users/jpjfckppxi1efpbt2ah8.webp";

    // Upload image if exists
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "vlogging_posts",
      });
      imageUrl = uploadResult.secure_url;

      fs.unlinkSync(req.file.path); // delete local file
    }

    const postData = {
      title,
      slug,
      content,
      imageUrl,
      altText: altText || "Vlog image",
      category,
      tags: tags ? tags.split(",") : [],
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywords ? metaKeywords.split(",") : [],
      readingTime,
      publishAt,
      allowComments: allowComments === "true",
      isFeatured: isFeatured === "true",
      isPublished: isPublished === "true",
      createdBy: req.user._id,
    };

    const newPost = await createPostService(postData);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error("Post creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
