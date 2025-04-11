import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSignupAnalytics } from "../../../store/slices/dashboardAnalyticsSlice.js";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import {
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
} from "@mui/material";

const formatMonth = (id) => {
  const [year, month] = id.split("-");
  const date = new Date(year, month - 1);
  return date.toLocaleString("default", { month: "short", year: "numeric" });
};

const SignupAnalyticsSection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const rawData = useSelector((state) => state.dashboardAnalytics.signups);

  useEffect(() => {
    dispatch(fetchSignupAnalytics());
  }, [dispatch]);

  const data = rawData?.map((item) => ({
    month: formatMonth(item._id),
    signupCount: item.count,
  })) || [];

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: { xs: 1, sm: 2 } }}>
      <CardContent>
        <Typography variant="h6" fontWeight={600} gutterBottom color="secondary">
          Monthly User Signups
        </Typography>

        {!rawData ? (
          <Box display="flex" justifyContent="center" alignItems="center" height={300}>
            <CircularProgress />
          </Box>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip formatter={(value) => [`${value} Signups`, '']} />
              <Line
                type="monotone"
                dataKey="signupCount"
                stroke={theme.palette.success.main}
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SignupAnalyticsSection;
