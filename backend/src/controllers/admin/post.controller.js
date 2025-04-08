import cloudinary from "../../config/cloudinaryConfig.js";
import { createPostService } from "../../services/admin/post.service.js";

import slugify from "slugify";

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

   // console.log("📥 Incoming Post Data:", req.body);

    // 🟡 Fallback Cloudinary image
    let imageUrl = "https://res.cloudinary.com/dexfdwvgf/image/upload/v1744011946/vlogging_users/jpjfckppxi1efpbt2ah8.webp";

    // ✅ Upload to Cloudinary if file exists
    if (req.file) {
     // console.log("📸 Uploading file to Cloudinary...");
      const streamUpload = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            {
              folder: "vlogging_posts",
              resource_type: "image",
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      try {
        const result = await streamUpload(req.file.buffer);
        imageUrl = result.secure_url;
      //  console.log("✅ Image uploaded to Cloudinary:", imageUrl);
      } catch (cloudErr) {
        console.error("❌ Cloudinary Upload Failed:", cloudErr.message);
        throw new Error("Cloudinary upload failed");
      }
    }

    // ✅ Slug generation
    let finalSlug = slug?.trim();
    if (!finalSlug) {
      finalSlug = slugify(title, { lower: true, strict: true });
    } else {
      finalSlug = slugify(finalSlug, { lower: true, strict: true });
    }
    //console.log("🔗 Final Slug:", finalSlug);

    const postData = {
      title: title.trim(),
      slug: finalSlug,
      content: content.trim(),
      imageUrl,
      altText: altText?.trim() || "Vlog image",
      category,
      tags: tags ? tags.split(",").map(tag => tag.trim()) : [],
      metaTitle: metaTitle?.trim(),
      metaDescription: metaDescription?.trim(),
      metaKeywords: metaKeywords ? metaKeywords.split(",").map(tag => tag.trim()) : [],
      readingTime,
      publishAt,
      allowComments: allowComments === "true",
      isFeatured: isFeatured === "true",
      isPublished: isPublished === "true",
      createdBy: req.user._id,
    };

   // console.log("📦 Final Post Data:", postData);

    const newPost = await createPostService(postData);

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });
  } catch (err) {
    console.error("🚨 Post creation error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
