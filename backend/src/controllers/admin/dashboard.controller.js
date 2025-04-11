import * as dashboardService from '../../services/admin/dashboard.service.js';


export const getDashboardStats = async(req, res) => {
    try {
        const stats = await dashboardService.getDashboardStats();
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getPostsPerMonth = async(req, res) => {
    try {
        const data = await dashboardService.getPostsPerMonth();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getUserSignupsOverTime = async(req, res) => {
    try {
        const data = await dashboardService.getUserSignupsOverTime();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getTopPerformingPosts = async(req, res) => {
    try {
        const data = await dashboardService.getTopPerformingPosts();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};

export const getCategoryPopularity = async(req, res) => {
    try {
        const data = await dashboardService.getCategoryPopularity();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
};


export const getTopPosts = async(req, res) => {
    try {
        console.log("req.user in getTopPosts:", req.user); // important!

        const result = await analyticsService.getTopPosts();
        res.status(200).json(result);
    } catch (error) {
        console.error("Error in getTopPosts:", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};