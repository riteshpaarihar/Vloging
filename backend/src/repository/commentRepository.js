import Comment from "../schemas/commentSchema.js";
import Post from "../schemas/postSchema.js";

export const createComment = async (data) => {
  const comment = await Comment.create(data);

  // Update comment count on Post
  await Post.findByIdAndUpdate(comment.post, {
    $inc: { commentCount: 1 },
  });

  // If it's a reply, update replyCount on parent comment
  if (comment.parentComment) {
    await Comment.findByIdAndUpdate(comment.parentComment, {
      $inc: { replyCount: 1 },
    });
  }

  return comment;
};

export const likeComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  const alreadyLiked = comment.likes?.includes?.(userId);
  if (alreadyLiked) {
    comment.likes.pull(userId);
    comment.likeCount = Math.max(0, comment.likeCount - 1);
  } else {
    comment.likes.push(userId);
    comment.likeCount += 1;
  }

  await comment.save();
  return comment;
};
