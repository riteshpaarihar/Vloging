import Post from "../../schemas/postSchema.js";
import User from "../../schemas/userSchema.js";
import Comment from "../../schemas/commentSchema.js";
import Like from "../../schemas/likeSchema.js";


export const getAllStatsCounts = async() => {
    const [totalUsers, totalPosts, totalComments, totalLikes] = await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        Like.countDocuments(),
    ]);

    return { totalUsers, totalPosts, totalComments, totalLikes };
};

export const getPostsCountByMonth = async(start, end) => {
    return await Post.countDocuments({ createdAt: { $gte: start, $lte: end } });
};