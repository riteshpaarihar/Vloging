import { generateDashboardStats, generatePostAnalytics } from "../../services/admin/stats.service.js";

export const getDashboardStats = async(req, res) => {
    try {
        const stats = await generateDashboardStats();
        res.status(200).json({ success: true, stats });
    } catch (error) {
        console.error("Stats Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getAnalyticsData = async(req, res) => {
    try {
        const analytics = await generatePostAnalytics();
        res.status(200).json({ success: true, analytics });
    } catch (error) {
        console.error("Analytics Error:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};