import { createPostInDB, deletePostById, findAllPosts, findPostById, updatePostById } from "../../repository/admin/post.repository.js";

import slugify from "slugify";

export const createPostService = async(postData) => {
    if (!postData.slug) {
        postData.slug = slugify(postData.title, { lower: true });
    }
    return await createPostInDB(postData);
};


export const getAllPostsService = async() => {
    return await findAllPosts();
};



export const getSinglePostService = async(id) => {
    const post = await findPostById(id);
    // console.log("findPostById loaded in service:", typeof findPostById);
    if (!post) throw new Error("Post not found");
    return post;
};

export const updatePostService = async(id, data) => {
    const post = await updatePostById(id, data);
    if (!post) throw new Error("Post not found or not updated");
    return post;
};

export const deletePostService = async(id) => {
    const post = await deletePostById(id);
    if (!post) throw new Error("Post not found or already deleted");
    return post;
};

export const togglePublishPostService = async(id) => {
    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");
    post.isPublished = !post.isPublished;
    await post.save();
    return post;
};

export const toggleFeaturePostService = async(id) => {
    const post = await findPostById(id);
    if (!post) throw new Error("Post not found");
    post.isFeatured = !post.isFeatured;
    await post.save();
    return post;
};