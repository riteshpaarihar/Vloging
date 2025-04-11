import * as dashboardRepo from '../../repository/admin/dashboard.repo.js';

export const getDashboardStats = async() => {
    return await dashboardRepo.fetchDashboardStats();
};

export const getPostsPerMonth = async() => {
    return await dashboardRepo.fetchPostsPerMonth();
};

export const getUserSignupsOverTime = async() => {
    return await dashboardRepo.fetchUserSignupsOverTime();
};

export const getTopPerformingPosts = async() => {
    return await dashboardRepo.fetchTopPerformingPosts();
};

export const getCategoryPopularity = async() => {
    return await dashboardRepo.fetchCategoryPopularity();
};