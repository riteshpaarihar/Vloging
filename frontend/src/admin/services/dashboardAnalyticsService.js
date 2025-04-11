import axios from "./api"; // your axios instance

const dashboardAnalyticsService = {
    getStats: async() => {
        try {
            const response = await axios.get("/admin/dashboard/stats");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch dashboard stats:", error);
            throw error;
        }
    },

    getPostAnalytics: async() => {
        try {
            const response = await axios.get("/admin/dashboard/analytics/posts");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch post analytics:", error);
            throw error;
        }
    },

    getSignupAnalytics: async() => {
        try {
            const response = await axios.get("/admin/dashboard/analytics/signups");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch signup analytics:", error);
            throw error;
        }
    },

    getTopPosts: async() => {
        try {
            const response = await axios.get("/admin/dashboard/analytics/top-posts");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch top posts:", error);
            throw error;
        }
    },

    getCategoryPopularity: async() => {
        try {
            const response = await axios.get("/admin/dashboard/analytics/category-popularity");
            return response.data;
        } catch (error) {
            console.error("Failed to fetch category popularity:", error);
            throw error;
        }
    },
};

export default dashboardAnalyticsService;