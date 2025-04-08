import { getAllStatsCounts, getPostsCountByMonth } from "../../repository/admin/stats.repository.js";
import moment from 'moment';

export const generateDashboardStats = async() => {
    return await getAllStatsCounts();
};

export const generatePostAnalytics = async() => {
    const lastSixMonths = [...Array(6)].map((_, i) => {
        const date = moment().subtract(i, "months");
        return {
            month: date.format("MMM YYYY"),
            start: date.startOf("month").toDate(),
            end: date.endOf("month").toDate(),
        };
    }).reverse();

    const postData = await Promise.all(
        lastSixMonths.map(async({ month, start, end }) => {
            const posts = await getPostsCountByMonth(start, end);
            return { month, posts };
        })
    );

    return { postData };
};