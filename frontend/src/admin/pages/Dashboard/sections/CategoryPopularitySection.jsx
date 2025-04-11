import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryPopularity } from "../../../store/slices/dashboardAnalyticsSlice.js";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
} from "@mui/material";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#9c27b0",
  "#e91e63",
  "#4caf50",
  "#f44336",
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0];
    return (
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "8px 12px",
          borderRadius: 1,
          boxShadow: 2,
          fontSize: 14,
        }}
      >
        <strong>{name || "Uncategorized"}</strong>: {value} posts
      </Box>
    );
  }
  return null;
};

const CategoryPopularitySection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const categories = useSelector(
    (state) => state.dashboardAnalytics.categoryPopularity
  );

  useEffect(() => {
    dispatch(fetchCategoryPopularity());
  }, [dispatch]);

  const processedData = categories.map((cat) => ({
    category: cat._id || "Uncategorized",
    count: cat.count,
  }));

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="primary" gutterBottom>
          Category Popularity
        </Typography>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={processedData}
              dataKey="count"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={140}
              label={({ name }) => name}
            >
              {processedData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryPopularitySection;
