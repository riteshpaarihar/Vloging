import Post from "../schemas/postSchema.js";

export const createPost = async (data) => await Post.create(data);

export const findPostById = async (postId) =>
  await Post.findById(postId).populate("createdBy");

export const toggleLikePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const alreadyLiked = post.likes?.includes?.(userId);
  if (alreadyLiked) {
    post.likes.pull(userId);
    post.likeCount = Math.max(0, post.likeCount - 1); // avoid negative
  } else {
    post.likes.push(userId);
    post.likeCount += 1;
  }

  await post.save();
  return post;
};

export const incrementPostCommentCount = async (postId) => {
  await Post.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });
};

export const decrementPostCommentCount = async (postId) => {
  await Post.findByIdAndUpdate(postId, { $inc: { commentCount: -1 } });
};

export const getAllPosts = async () => {
  return await Post.find({})
    .populate("createdBy", "username email") // Optional: populate creator info
    .sort({ createdAt: -1 }); // Optional: newest first
};

