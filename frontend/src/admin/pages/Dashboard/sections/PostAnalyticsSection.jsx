import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostAnalytics } from "../../../store/slices/dashboardAnalyticsSlice.js";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Typography,
  Box,
  Card,
  CardContent,
  useTheme,
  CircularProgress,
} from "@mui/material";

const formatMonth = (id) => {
  const [year, month] = id.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const PostAnalyticsSection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const rawData = useSelector((state) => state.dashboardAnalytics.posts);

  useEffect(() => {
    dispatch(fetchPostAnalytics());
  }, [dispatch]);

  const data = rawData?.map((item) => ({
    month: formatMonth(item._id),
    postCount: item.count,
  })) || [];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom color="primary">
          Monthly Post Analytics
        </Typography>

        {!rawData ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip
                labelStyle={{ fontWeight: 600 }}
                formatter={(value) => [`${value} Posts`, '']}
              />
              <Bar dataKey="postCount" fill={theme.palette.primary.main} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default PostAnalyticsSection;
