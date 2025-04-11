import Comment from '../../schemas/commentSchema.js';
import Like from '../../schemas/likeSchema.js';
import Post from '../../schemas/postSchema.js';
import User from '../../schemas/userSchema.js';
import Message from '../../schemas/messageSchema.js';

export const fetchDashboardStats = async() => {
    const [
        totalUsers,
        totalPosts,
        totalComments,
        totalLikes,
        totalMessages,
        activePosts,
        draftPosts,
        reportedComments,
        reportedPosts
    ] = await Promise.all([
        User.countDocuments(),
        Post.countDocuments(),
        Comment.countDocuments(),
        Like.countDocuments(),
        Message.countDocuments(),
        Post.countDocuments({ isPublished: true, isFeatured: true }),
        Post.countDocuments({ isPublished: false }),
        Comment.countDocuments({ isReported: true }),
        Post.countDocuments({ isReported: true })
    ]);

    return {
        totalUsers,
        totalPosts,
        totalComments,
        totalLikes,
        totalMessages,
        activePosts,
        draftPosts,
        reportedComments,
        reportedPosts
    };
};

export const fetchPostsPerMonth = async() => {
    return await Post.aggregate([{
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
};

export const fetchUserSignupsOverTime = async() => {
    return await User.aggregate([{
            $group: {
                _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
                count: { $sum: 1 }
            }
        },
        { $sort: { _id: 1 } }
    ]);
};

// export const fetchTopPerformingPosts = async() => {
//     return await Post.aggregate([{
//             $project: {
//                 title: 1,
//                 views: 1,
//                 likesCount: { $size: '$likes' },
//                 commentsCount: { $size: '$comments' }
//             }
//         },
//         { $sort: { views: -1, likesCount: -1, commentsCount: -1 } },
//         { $limit: 5 }
//     ]);
// };

export const fetchCategoryPopularity = async() => {
    return await Post.aggregate([{
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1 } }
    ]);
};

export const fetchTopPerformingPosts = async() => {
    return await Post.aggregate([{
            $lookup: {
                from: 'comments',
                localField: '_id',
                foreignField: 'post',
                as: 'postComments'
            }
        },
        {
            $lookup: {
                from: 'likes',
                localField: '_id',
                foreignField: 'post',
                as: 'postLikes'
            }
        },
        {
            $project: {
                title: 1,
                views: 1,
                likesCount: { $size: '$postLikes' },
                commentsCount: { $size: '$postComments' }
            }
        },
        {
            $sort: {
                views: -1,
                likesCount: -1,
                commentsCount: -1
            }
        },
        {
            $limit: 5
        }
    ]);
};