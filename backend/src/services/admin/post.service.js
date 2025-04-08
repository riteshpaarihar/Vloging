import { createPostInDB } from "../../repository/admin/post.repository.js";

import slugify from "slugify";

export const createPostService = async(postData) => {
    if (!postData.slug) {
        postData.slug = slugify(postData.title, { lower: true });
    }
    return await createPostInDB(postData);
};