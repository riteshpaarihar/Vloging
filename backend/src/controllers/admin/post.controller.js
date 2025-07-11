import cloudinary from "../../config/cloudinaryConfig.js";
import Post from "../../schemas/postSchema.js";
import readingTime from "reading-time";


import { createPostService, deletePostService, getAllPostsService, getSinglePostService, toggleFeaturePostService, togglePublishPostService, updatePostService } from "../../services/admin/post.service.js";

import slugify from "slugify";


const toBoolean = (val) => {
  if (val === "true" || val === true) return true;
  if (val === "false" || val === false) return false;
  return null; // or return a default value (e.g., false) if needed
};

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
      publishAt,
      allowComments,
      isFeatured,
      isPublished,
    } = req.body;

    // ✅ Basic validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // Ensure category is valid
    const validCategories = ["Travel", "Tech", "Fitness", "Lifestyle", "Food"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category. Allowed categories: Travel, Tech, Fitness, Lifestyle, Food.",
      });
    }

    // ✅ Default fallback image
    let imageUrl = "https://res.cloudinary.com/dexfdwvgf/image/upload/v1744011946/vlogging_users/jpjfckppxi1efpbt2ah8.webp";

    // ✅ Upload to Cloudinary if file exists
    if (req.file) {
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
      } catch (cloudErr) {
        console.error("❌ Cloudinary Upload Failed:", cloudErr.message);
        throw new Error("Image upload failed. Please try again.");
      }
    }

    // ✅ Slug generation
    let finalSlug = slug?.trim();
    if (!finalSlug) {
      finalSlug = slugify(title, { lower: true, strict: true });
    } else {
      finalSlug = slugify(finalSlug, { lower: true, strict: true });
    }

    // ✅ Check if slug already exists
    const existing = await Post.findOne({ slug: finalSlug });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "A post with this title or slug already exists. Please change it.",
      });
    }

    // ✅ Auto calculate reading time
    const readingStats = readingTime(content);

    // ✅ Prepare data
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
      readingTime: readingStats.text,
      publishAt,
      allowComments: toBoolean(allowComments),
      isFeatured: toBoolean(isFeatured),
      isPublished: toBoolean(isPublished),
      createdBy: req.user._id,
    };

    // ✅ Create post
    const newPost = await createPostService(postData);

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      post: newPost,
    });

  } catch (err) {
    console.error("🚨 Post creation error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};
export const getAllPosts = async (req, res) => {
  try {
    const posts = await getAllPostsService();
    res.status(200).json({ success: true, posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


export const getSinglePost = async (req, res) => {

  try {
    const post = await getSinglePostService(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
};

// export const updatePost = async (req, res) => {
//   try {
//     const updatedPost = await updatePostService(req.params.id, req.body);
//     res.status(200).json({ success: true, updatedPost });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

export const updatePost = async (req, res) => {
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
      publishAt,
      allowComments,
      isFeatured,
      isPublished,
    } = req.body;

    // ✅ Basic validation
    if (!title || !content || !category) {
      return res.status(400).json({
        success: false,
        message: "Title, content, and category are required",
      });
    }

    // ✅ Validate category
    const validCategories = ["Travel", "Tech", "Fitness", "Lifestyle", "Food"];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // ✅ Upload new image if exists
    let imageUrl;
    if (req.file) {
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
      } catch (err) {
        console.error("❌ Cloudinary Upload Failed:", err.message);
        return res.status(500).json({ success: false, message: "Image upload failed" });
      }
    }

    // ✅ Generate or update slug
    let finalSlug = slug?.trim();
    if (!finalSlug) {
      finalSlug = slugify(title, { lower: true, strict: true });
    } else {
      finalSlug = slugify(finalSlug, { lower: true, strict: true });
    }

    // ✅ Calculate reading time
    const readingStats = readingTime(content);

    // ✅ Prepare update object
    const updateData = {
      title: title.trim(),
      slug: finalSlug,
      content: content.trim(),
      altText: altText?.trim() || "Vlog image",
      category,
      tags: typeof tags === "string" ? tags.split(",").map(tag => tag.trim()) : [],
      metaTitle: metaTitle?.trim(),
      metaDescription: metaDescription?.trim(),
      metaKeywords: typeof metaKeywords === "string" ? metaKeywords.split(",").map(k => k.trim()) : [],
      readingTime: readingStats.text,
      publishAt,
      allowComments: toBoolean(allowComments),
      isFeatured: toBoolean(isFeatured),
      isPublished: toBoolean(isPublished),
    };

    if (imageUrl) {
      updateData.imageUrl = imageUrl;
    }

    // ✅ Remove undefined fields (optional)
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) delete updateData[key];
    });

    // ✅ Perform update
    const updatedPost = await updatePostService(req.params.id, updateData);

    return res.status(200).json({ success: true, updatedPost });

  } catch (err) {
    console.error("🚨 Update Post Error:", err);
    return res.status(500).json({ success: false, message: err.message });
  }
};


export const deletePost = async (req, res) => {
  try {
    await deletePostService(req.params.id);
    res.status(200).json({ success: true, message: "Post deleted successfully" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const publishPost = async (req, res) => {
  try {
    const post = await togglePublishPostService(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

export const featurePost = async (req, res) => {
  try {
    const post = await toggleFeaturePostService(req.params.id);
    res.status(200).json({ success: true, post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};
